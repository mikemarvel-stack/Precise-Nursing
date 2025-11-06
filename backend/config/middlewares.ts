export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
            '*.amazonaws.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
            '*.amazonaws.com'
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'https://precisenursing.com',
        'https://www.precisenursing.com'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::rate-limit',
    config: {
      interval: 60000,
      max: 100,
      prefixKey: 'rl_',
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      enableHeaders: true,
      headers: {
        reset: 'X-RateLimit-Reset',
        total: 'X-RateLimit-Limit',
        remaining: 'X-RateLimit-Remaining'
      }
    }
  }
];