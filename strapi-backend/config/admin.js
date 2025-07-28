module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'k3J8s9v2Q1p6z8x7w2v1q3r4t5y6u7i8'),
  },
}); 