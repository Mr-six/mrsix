const Base           = require('./base')
const {userModel}    = require('../../models').v1
const $              = require('../../utils')
const auth           = require('../../utils/auth')
const {schema}       = require('../../config')
const {tokenPromise, createToken} = require('../../utils/auth')

const userApi     = new Base({
  model: userModel,
  search: 'nickname'
})

/**
 * 创建用户
 * 1. 验证对象结构
 * 2. 判重
 * 4. 生成token
 */
userApi.methods.create = async function (ctx) {
  let body = ctx.request.body
  const {error, value} = $.joi.validate(body, schema.user)  // 验证body对象
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }

  // 判断邮箱或者手机是否已经存在
  let exist
  if (value.email) {  // 邮箱判断
    exist  = await userModel.findOne({"email": value.email})
  } else if (value.phone) {
    exist  = await userModel.findOne({"phone": value.phone})
  } else {
    return $.result(ctx, '请输入正确的帐号')
  }
  if (exist) return $.result(ctx, '帐号已存在!')
  
  value.password = await $.encrypt(value.password)   // 密码加密储存
  let user       = await userModel.create(value)     // 用户储存
  const token    = auth.createToken({id: user._id})  // 生成token
  user           = await userModel.update({_id: user._id}, { token: token })
  $.result(ctx, user)
}


/**
 * 用户登陆
 * 1. 对象验证
 * 2. 验证存在性
 * 3. token 检查
 */
userApi.methods.login = async function (ctx) {
  let body = ctx.request.body

  const { error, value } = $.joi.validate(body, schema.user)
  
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }
  
  let user  // 用户信息
  if (value.email) {  // 邮箱登陆
    user = await userModel.findOne({"email": value.email})
  } else if (value.phone) { // 手机登陆
    user = await userModel.findOne({"phone": value.phone})
  } else {
    return $.result(ctx, '请输入正确的帐号')
  }

  if ($.isEmpty(user)) return $.result(ctx, '账户不存在')
  
  let isUserPss = await $.decrypt(value.password, user.password)  // 验证秘密正确性
  if (!isUserPss) return $.result(ctx, '账户或密码错误')
 

  // token是否过期
  let {token} = user
  try {
    const decode = await tokenPromise(token)
  } catch (e) {  // 生成新token
    $.info('get new token')
    token = auth.createToken({id: user._id})
    user = await userModel.findOneAndUpdate({_id: user._id}, { token: token })
  }
  if ($.isEmpty(user)) $.result(ctx, '登陆失败, 未知原因', 507)
  else {
    let {_id, nickname, headimgurl, token} = user
    $.result(ctx, {_id, nickname, headimgurl, token})
  }
}

/**
 * 更改密码逻辑
 * 1. post body 验证
 * 2. 新旧密码验证
 * 3. 密码更新
 * 4. 返回用户
 */
userApi.methods.resetPassword = async function (ctx) {
  let body = ctx.request.body
  const { error, value } = $.joi.validate(body, schema.user)
  if (value.password === value.newpassword) return $.result(ctx, 'same password!')

  let password = await $.encrypt(value.password)
  let user = await userModel.update({ _id: ctx.user._id}, {password: password})
  if (user === -1) $.result(ctx, 'reset failed')
  else $.result(ctx, user)
}

/**
 * 更新用户信息
 * 当用户小于管理员权限时,过滤掉密码和token属性
 * 普通用户只能更改有限的信息
 */
userApi.methods.update = async function (ctx) {
  let body = ctx.request.body
  let data  // 更新数据
  let permission = ctx.user.permission  // 用户权限
  let id = ctx.user.id  // 用户id
  if (permission < 3) {
    if (id !== ctx.params.id) return $.result(ctx, 'Not Allowed', 405)  // 禁止非管理员 更改其他用户信息
    const {error, value} = $.joi.validate(body, schema.modifyIofo)
    if (error) {
      $.error(error)
      return $.result(ctx, 'params error')
    }
    data = value
  } else {
    data = body
  }
  let options = {  // 选项
    new: true,
    fields: '-password -token -status -permission'
  }
  let res = await userModel.findOneAndUpdate({ "_id": ctx.params.id }, data, options)
  if (res === -1) $.result(ctx, 'update failed')
  else $.result(ctx, res)
}

/**
 * 查看单个用户信息
 */
userApi.methods.findById = async function (ctx) {
  let id = ctx.params.id
  let permission = ctx.user.permission
  let options = ctx.request.body.options || {}
  if (id !== ctx.user.id && permission < 3) {  // 权限限制
    options.select = 'headimgurl intro sex nickname'
  } else {
    options.select = '-password'
  }
  let res = await userModel.findById(id, options)
  if (res === -1) $.result(ctx, 'error id')
  else $.result(ctx, res)
}

module.exports = userApi.methods
