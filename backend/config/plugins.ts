export default ({ env }) => ({
  // Stripe Plugin Configuration
  'strapi-stripe': {
    enabled: true,
    config: {
      stripeSecretKey: env('STRIPE_SECRET_KEY'),
      stripePublishableKey: env('STRIPE_PUBLISHABLE_KEY'),
      stripeWebhookSecret: env('STRIPE_WEBHOOK_SECRET'),
      currency: 'usd',
      paymentMethods: ['card', 'apple_pay', 'google_pay'],
      captureMethod: 'automatic',
      confirmationMethod: 'automatic',
    },
  },

  // PayPal Plugin Configuration
  'strapi-paypal': {
    enabled: true,
    config: {
      clientId: env('PAYPAL_CLIENT_ID'),
      clientSecret: env('PAYPAL_CLIENT_SECRET'),
      environment: env('PAYPAL_ENVIRONMENT', 'sandbox'), // 'sandbox' or 'live'
      currency: 'USD',
      intent: 'capture',
    },
  },

  // SSL and Security
  'strapi-plugin-seo': {
    enabled: true,
  },

  // Auto Backup Plugin
  'strapi-plugin-backup': {
    enabled: true,
    config: {
      cronExpression: '0 2 * * *', // Daily at 2 AM
      storageService: 's3',
      s3Config: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        region: env('AWS_REGION', 'us-east-1'),
        bucket: env('AWS_BACKUP_BUCKET'),
      },
      retentionDays: 30,
      includeUploads: true,
      includeDatabase: true,
    },
  },

  // Email Configuration
  email: {
    config: {
      provider: 'amazon-ses',
      providerOptions: {
        key: env('AWS_SES_ACCESS_KEY_ID'),
        secret: env('AWS_SES_SECRET_ACCESS_KEY'),
        amazon: env('AWS_SES_REGION', 'us-east-1'),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'noreply@precisenursing.com'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'support@precisenursing.com'),
      },
    },
  },

  // Upload Configuration for S3
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        region: env('AWS_REGION'),
        bucket: env('AWS_BUCKET'),
        endpoint: env('AWS_ENDPOINT'), // Optional for custom S3 endpoints
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // Documentation
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'PreciseNursing API',
        description: 'Healthcare management platform API',
        contact: {
          name: 'PreciseNursing Support',
          email: 'support@precisenursing.com',
        },
      },
      servers: [
        {
          url: env('API_URL', 'http://localhost:1337'),
          description: 'Development server',
        },
      ],
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },

  // GraphQL
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
});