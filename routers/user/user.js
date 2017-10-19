const Router      = require('koa-router')
const {authToken} = require('../../utils/auth')
const {userApi}   = require('../../api').v1
const user        = new Router()

/**
 * 用户操作 api
 */
user.post('/login',         userApi.login)                     // 登录逻辑

user.post('/signup',        userApi.create)                    // 注册逻辑

user.put('/resetPassword',  authToken, userApi.resetPassword)  // 修改密码

user.get('/account',        authToken, userApi.all)           // 查找所有用户

user.get('/account/:id',    authToken, userApi.findById)      // 查看单个用户
    .patch('/account/:id',  authToken, userApi.update)        // 更新单个用户
    .delete('/account/:id', authToken, userApi.delete)        // 删除单个用户

module.exports = user