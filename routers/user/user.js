const Router      = require('koa-router')
const {authToken} = require('../../utils/auth')
const {userApi}   = require('../../api').v1
const user        = new Router()

/**
 * 登录逻辑
 */
user.post('/login', userApi.login)

/**
 * 注册逻辑
 */
user.post('/signup', userApi.create)

/**
 * 修改密码
 */
user.patch('/resetPassword', authToken, userApi.resetPassword)

/**
 * 查找用户
 */
user.post('/account', authToken, userApi.all)

/**
 * 查找单个用户信息
 */
user.post('/account/:id', authToken, userApi.findById)

/**
 * 更新用户信息
 */
user.patch('/account/:id', authToken, userApi.update)

/**
 * 删除用户
 */
user.delete('/account/:id', authToken, userApi.delete)

module.exports = user