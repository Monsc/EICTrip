'use strict';

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // ▲ 你的旧配置
  // ▼ 新增会话密钥，必须是长度一致的 4 个字符串
  app: {
    keys: env.array('APP_KEYS', [
      '6c7fcb8a1e3442d8969d94a1f1f6d14b',
      '9c1e509be7f14a6c8a8491dff0be07e2',
      'c67c8d7ad7db4a0c88b5b28b8d30c939',
      'f8c426e9d0e84814b9e681ab9af0e6c7',
    ]),
  },
});
