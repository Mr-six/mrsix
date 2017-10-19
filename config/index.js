const isProd   =  process.env.NODE_ENV === 'production'
const path     = require('path')
const schema   = require('./schema')                // 验证规则
const proxyUrl = require('./proxyUrl')              // 代理 url
const custom   = require('./custom')                // 自定义配置
const static   = path.join( __dirname,'../static')  // 静态文件夹

module.exports = {
  isProd,                                             // 判断当前环境
  schema,                                             // 对象验证规则
  static,                                             // 静态目录
  proxyUrl,                                           // 代理 url
  limitDb:      20,                                   // 默认每页数据条数
  tokenExpires: '7d',                                 // token 有效时间 7天
  port: isProd  ? '8006' : '3000',                    // 端口
  db:           'mongodb://127.0.0.1:27017/mrsix',    // 生产数据库
  dbtest:       'mongodb://127.0.0.1:27017/test',     // 测试数据库
  oss:          custom.oss,                           // 阿里云 oss
  secret:       custom.secret,                        // jwt secret
}