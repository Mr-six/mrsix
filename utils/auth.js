const {userModel} = require('../models').v1
const $           = require('./index')
const jwt         = require('jsonwebtoken')
const config      = require('../config')

/**
 * 解析token信息
 * value 的内容为:
 * 用户的 _id 
 * 权限值 permission
 * @param {String} token 用户token
 */
function tokenPromise (token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, config.secret, (err, value) => {
      if (err) {reject(err)}
      resolve(value)
    })
  })
}

/**
 * 生成token
 * json为对象结构
 * 包含 用户 _id 和 permission 权限值
 * @param {Object} json 待加密字段
 */
function createToken (json) {
  const token = jwt.sign(json, config.secret, { expiresIn: config.tokenExpires})
  return token;
}

/**
 * 验证token的正确性 中间价形式
 * 根据用户权限 判断是否有权访问
 * @param {koa} ctx 上下文
 * @param {koa} next 
 */
async function authToken (ctx, next) {
  const token = ctx.request.body.token || null
  if ($.isEmpty(token)) return $.result(ctx, 'token error')
  try {  // 解析token
    const decode = await tokenPromise(token)
    if (decode) {  // 解析结果
      let user = await userModel.findById(decode.id)
      if ($.isEmpty(user)) return $.result(ctx, 'token error')
      ctx.user = decode
      if (ctx.request.body.token) delete ctx.request.body.token  // 删除 token
      return next()
    } else {
      $.result(ctx, 'token error')
    }
  } catch (e) {
    $.result(ctx, 'token error')
  }
}

module.exports = {
  tokenPromise,
  createToken,
  authToken,
}