const Router  = require('koa-router')
const router  = new Router()

const user    = require('./user/user')

const article = require('./article/article')

const upload  = require('./upload/upload')

const debug   = require('./debug/debug')

const oss     = require('./oss/oss')

const {authToken} = require('../utils/auth')

/**
 * user router
 */
router.use('/user', user.routes(), user.allowedMethods())

/**
 * article router
 */
router.use('/article', article.routes(), article.allowedMethods())

/**
 * upload router
 */
router.use('/upload', authToken, upload.routes(), upload.allowedMethods())

/**
 * debug router
 */
router.use('/debug', debug.routes(), debug.allowedMethods())

/**
 * ali oss router
 */
router.use('/oss', authToken, oss.routes(), oss.allowedMethods())


module.exports = router
