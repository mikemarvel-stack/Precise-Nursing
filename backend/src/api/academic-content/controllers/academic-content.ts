import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::academic-content.academic-content', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx
    
    const entity = await strapi.entityService.findMany('api::academic-content.academic-content', {
      ...query,
      populate: ['previewFile', 'images'],
      filters: {
        ...query.filters,
        publishedAt: { $notNull: true }
      }
    })

    return this.transformResponse(entity)
  },

  async findOne(ctx) {
    const { id } = ctx.params
    const { query } = ctx

    const entity = await strapi.entityService.findOne('api::academic-content.academic-content', id, {
      ...query,
      populate: ['previewFile', 'images', 'downloadFile']
    })

    return this.transformResponse(entity)
  },

  async purchase(ctx) {
    const { id } = ctx.params
    const { customerEmail, customerName } = ctx.request.body

    try {
      const content = await strapi.entityService.findOne('api::academic-content.academic-content', id)
      
      if (!content) {
        return ctx.notFound('Content not found')
      }

      const orderNumber = `AC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const order = await strapi.entityService.create('api::order.order', {
        data: {
          orderNumber,
          totalAmount: content.price,
          customerEmail,
          customerName,
          academicContent: id,
          user: ctx.state.user?.id
        }
      })

      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(content.price * 100),
        currency: 'usd',
        metadata: {
          orderId: order.id.toString(),
          contentId: id.toString()
        }
      })

      await strapi.entityService.update('api::order.order', order.id, {
        data: { stripePaymentIntentId: paymentIntent.id }
      })

      ctx.send({
        clientSecret: paymentIntent.client_secret,
        orderId: order.id
      })
    } catch (error) {
      strapi.log.error('Purchase failed:', error)
      ctx.internalServerError('Purchase failed')
    }
  }
}));