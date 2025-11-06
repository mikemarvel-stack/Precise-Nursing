import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async find(ctx) {
    const { user } = ctx.state
    
    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    const orders = await strapi.entityService.findMany('api::order.order', {
      filters: { user: user.id },
      populate: ['academicContent', 'customOrder'],
      sort: { createdAt: 'desc' }
    })

    return this.transformResponse(orders)
  },

  async findOne(ctx) {
    const { id } = ctx.params
    const { user } = ctx.state

    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    const order = await strapi.entityService.findOne('api::order.order', id, {
      populate: ['academicContent', 'customOrder', 'user']
    })

    if (!order || order.user.id !== user.id) {
      return ctx.notFound('Order not found')
    }

    return this.transformResponse(order)
  },

  async download(ctx) {
    const { id } = ctx.params
    const { user } = ctx.state

    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    try {
      const order = await strapi.entityService.findOne('api::order.order', id, {
        populate: ['academicContent.downloadFile', 'customOrder.deliveredFile', 'user']
      })

      if (!order || order.user.id !== user.id) {
        return ctx.notFound('Order not found')
      }

      if (order.paymentStatus !== 'paid' || order.status !== 'completed') {
        return ctx.badRequest('Order must be completed and paid to download')
      }

      let fileToDownload = null

      // Check if it's an academic content order
      if (order.academicContent && order.academicContent.downloadFile) {
        fileToDownload = order.academicContent.downloadFile
      }
      // Check if it's a custom order
      else if (order.customOrder && order.customOrder.deliveredFile) {
        fileToDownload = order.customOrder.deliveredFile
      }

      if (!fileToDownload) {
        return ctx.notFound('No file available for download')
      }

      // Set response headers for file download
      ctx.set('Content-Type', fileToDownload.mime || 'application/octet-stream')
      ctx.set('Content-Disposition', `attachment; filename="${fileToDownload.name}"`)
      
      // Return file stream
      const fs = require('fs')
      const path = require('path')
      const filePath = path.join(strapi.config.get('server.dir'), 'public', fileToDownload.url)
      
      if (fs.existsSync(filePath)) {
        ctx.body = fs.createReadStream(filePath)
      } else {
        return ctx.notFound('File not found on server')
      }

    } catch (error) {
      strapi.log.error('Download error:', error)
      return ctx.internalServerError('Download failed')
    }
  }
}));