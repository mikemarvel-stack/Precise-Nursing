import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::custom-order.custom-order', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body

    try {
      const customOrder = await strapi.entityService.create('api::custom-order.custom-order', {
        data: {
          ...data,
          user: ctx.state.user?.id
        },
        populate: ['attachments']
      })

      // Send notification email to admin
      await strapi.plugins['email'].services.email.send({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Custom Order Received',
        html: `
          <h2>New Custom Order</h2>
          <p><strong>Title:</strong> ${customOrder.title}</p>
          <p><strong>Customer:</strong> ${customOrder.customerName} (${customOrder.customerEmail})</p>
          <p><strong>Category:</strong> ${customOrder.category}</p>
          <p><strong>Pages:</strong> ${customOrder.pages}</p>
          <p><strong>Deadline:</strong> ${new Date(customOrder.deadline).toLocaleDateString()}</p>
          <p><a href="${process.env.FRONTEND_URL}/admin/custom-orders/${customOrder.id}">View Order</a></p>
        `
      })

      ctx.send(customOrder)
    } catch (error) {
      strapi.log.error('Custom order creation failed:', error)
      ctx.internalServerError('Failed to create custom order')
    }
  },

  async updateQuote(ctx) {
    const { id } = ctx.params
    const { quotedPrice, adminNotes } = ctx.request.body

    try {
      const customOrder = await strapi.entityService.update('api::custom-order.custom-order', id, {
        data: {
          quotedPrice,
          adminNotes,
          status: 'quoted'
        }
      })

      // Send quote email to customer
      await strapi.plugins['email'].services.email.send({
        to: customOrder.customerEmail,
        subject: 'Quote for Your Custom Order',
        html: `
          <h2>Your Quote is Ready</h2>
          <p>Dear ${customOrder.customerName},</p>
          <p>We have prepared a quote for your custom order: <strong>${customOrder.title}</strong></p>
          <p><strong>Quoted Price:</strong> $${quotedPrice}</p>
          <p><a href="${process.env.FRONTEND_URL}/orders/${customOrder.id}">Accept Quote</a></p>
        `
      })

      ctx.send(customOrder)
    } catch (error) {
      strapi.log.error('Quote update failed:', error)
      ctx.internalServerError('Failed to update quote')
    }
  },

  async acceptQuote(ctx) {
    const { id } = ctx.params

    try {
      const customOrder = await strapi.entityService.findOne('api::custom-order.custom-order', id)
      
      if (!customOrder || customOrder.status !== 'quoted') {
        return ctx.badRequest('Invalid order or quote not available')
      }

      const orderNumber = `CO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const order = await strapi.entityService.create('api::order.order', {
        data: {
          orderNumber,
          totalAmount: customOrder.quotedPrice,
          customerEmail: customOrder.customerEmail,
          customerName: customOrder.customerName,
          customOrder: id,
          user: ctx.state.user?.id
        }
      })

      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(customOrder.quotedPrice * 100),
        currency: 'usd',
        metadata: {
          orderId: order.id.toString(),
          customOrderId: id.toString()
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
      strapi.log.error('Quote acceptance failed:', error)
      ctx.internalServerError('Failed to accept quote')
    }
  }
}));