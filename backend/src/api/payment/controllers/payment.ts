import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  async createPaymentIntent(ctx) {
    try {
      const { amount, currency = 'usd', metadata = {} } = ctx.request.body

      if (!amount || amount <= 0) {
        return ctx.badRequest('Invalid amount')
      }

      // TODO: Implement Stripe payment processing
      const payment = await strapi.entityService.create('api::payment.payment', {
        data: {
          amount,
          currency,
          status: 'pending',
          userId: ctx.state.user?.id,
          metadata: JSON.stringify(metadata),
        },
      })

      ctx.send({
        message: 'Payment processing temporarily disabled',
        paymentId: payment.id,
      })
    } catch (error) {
      strapi.log.error('Payment creation failed:', error)
      ctx.internalServerError('Payment processing failed')
    }
  },

  async stripeWebhook(ctx) {
    // TODO: Implement Stripe webhook handling
    ctx.send({ received: true, message: 'Webhook processing temporarily disabled' })
  },
}));