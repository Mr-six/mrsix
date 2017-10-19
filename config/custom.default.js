/**
 * 用户自定配置
 */
module.exports = {
  secret: 'jwt secret',                     // jwt secret
  oss:  {                                   // 阿里 oss 配置
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: 'oss-cn-beijing',
    role: '',
    TokenExpireTime: 1000,
    policy: [],
    "Version": "1"
  },
}