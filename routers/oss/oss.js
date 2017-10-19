const Router     = require('koa-router')
const {getAcessOss} = require('../../api').v1
const oss      = new Router()

oss.get('/',getAcessOss)

module.exports = oss