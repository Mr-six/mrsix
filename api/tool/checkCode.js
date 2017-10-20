/**
 * 用于验证手机或邮箱的验证码
 */

const $                = require('../../utils')
const {getVal, delKey} = require('../../utils/redis')

async function checkCode (key, val) {
  try {
  let res = await getVal(key)
  if (res === val) {
    await delKey()
    return true
  }
  return false
  } catch (e) {
    $.error(e)
  }
}