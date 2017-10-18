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
 * 查找所有用户
 */
user.post('/account', authToken, userApi.all)

/**
 * 单个用户操作
 */
user.post('/account/:id',   authToken, userApi.findById)  // 查看
    .patch('/account/:id',  authToken, userApi.update)    // 更新
    .delete('/account/:id', authToken, userApi.delete)    // 删除

module.exports = user