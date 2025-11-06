export default {
  routes: [
    {
      method: 'POST',
      path: '/payments/stripe/create-intent',
      handler: 'payment.createPaymentIntent',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/payments/stripe/webhook',
      handler: 'payment.stripeWebhook',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/payments/:id/status',
      handler: 'payment.getPaymentStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};