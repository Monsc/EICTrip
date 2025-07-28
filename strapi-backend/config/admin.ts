export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'joytotrip-admin-secret-key'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'k3J8s9v2Q1p6z8x7w2v1q3r4t5y6u7i8'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'joytotrip-transfer-salt-key'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', 'joytotrip-encryption-key-32chars'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
