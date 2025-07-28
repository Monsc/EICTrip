// strapi-backend/src/api/stripe/routes.js
'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/stripe/checkout',
      handler: 'stripe.createCheckoutSession',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/stripe/webhook',
      handler: 'stripe.webhook',
      config: { auth: false },
    },
  ],
};