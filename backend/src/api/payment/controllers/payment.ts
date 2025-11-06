import { factories } from '@strapi/strapi'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  async createPaymentIntent(ctx) {
    try {
      const { amount, currency = 'usd', metadata = {} } = ctx.request.body

      if (!amount || amount <= 0) {
        return ctx.badRequest('Invalid amount')
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        metadata: {
          userId: ctx.state.user?.id?.toString(),
          ...metadata,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      })

      const payment = await strapi.entityService.create('api::payment.payment', {
        data: {
          stripePaymentIntentId: paymentIntent.id,
          amount,
          currency,
          status: 'pending',
          userId: ctx.state.user?.id,
          metadata: JSON.stringify(metadata),
        },
      })

      ctx.send({
        clientSecret: paymentIntent.client_secret,
        paymentId: payment.id,
      })
    } catch (error) {
      strapi.log.error('Payment intent creation failed:', error)
      ctx.internalServerError('Payment processing failed')
    }
  },

  async stripeWebhook(ctx) {
    const sig = ctx.request.headers['stripe-signature']
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    try {
      const event = stripe.webhooks.constructEvent(ctx.request.body, sig, endpointSecret!)

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object
          const successPayment = await strapi.entityService.findMany('api::payment.payment', {
            filters: { stripePaymentIntentId: paymentIntent.id },
          })
          if (successPayment.length > 0) {
            await strapi.entityService.update('api::payment.payment', successPayment[0].id, {
              data: { status: 'completed' }
            })
          }
          break

        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object
          const failedPaymentRecord = await strapi.entityService.findMany('api::payment.payment', {
            filters: { stripePaymentIntentId: failedPayment.id },
          })
          if (failedPaymentRecord.length > 0) {
            await strapi.entityService.update('api::payment.payment', failedPaymentRecord[0].id, {
              data: { status: 'failed' }
            })
          }
          break
      }

      ctx.send({ received: true })
    } catch (error) {
      strapi.log.error('Webhook signature verification failed:', error)
      ctx.badRequest('Invalid signature')
    }
  },
}));