// Production Configuration
export const productionConfig = {
  appName: 'EICTrip',
  appVersion: '1.0.0',
  apiBaseUrl: 'https://api.eictrip.com',
  stripePublicKey: 'pk_test_your_stripe_public_key_here',
  googleAnalyticsId: 'GA_MEASUREMENT_ID',
  sentryDsn: 'your_sentry_dsn_here',
  environment: 'production',
  
  // Feature flags
  features: {
    payment: true,
    chat: true,
    notifications: true,
    analytics: true
  },
  
  // API endpoints
  endpoints: {
    auth: '/api/auth',
    tours: '/api/tours',
    guides: '/api/guides',
    bookings: '/api/bookings',
    payments: '/api/payments'
  }
}
