const axios  = require('axios')
const config = require('../config')
const $      = require('../../../utils')
const redis  = require('../../../utils/redis')
const querystring = require('querystring')

axios.defaults.withCredentials = true

let headers = {}
// 正则过滤cookie规则
const reg_cookie = /GINFO=uid|GKEY=\w{10,}/

Object.assign(headers, config.headers)

let user = {
  account: '582497915@qq.com',
  password: 'Zsin90=1!m',
}


async function getCookie (user) {
  let userStr = querystring.stringify(user)
  try {
    let Cookie = await redis.getVal(user.account)
    if (Cookie) {
      Object.assign(headers, {Cookie})
      let {data} = await axios.get(config.zmz.check_login, {headers})
      if (data.status === 1) return Cookie
    }
    let res = await axios.post(config.zmz.sigin_path, userStr, {headers})
    if (res.data.status !== 1) return false
    Cookie =  filterCookie(res.headers['set-cookie']).join(';')
    await redis.setKey(user.account, Cookie)
    return Cookie
  } catch (e) {
    $.error(e)
    return false
  }
}

getCookie(user)
  .then((res) => $.info(res))


function filterCookie (cookie) {
  let COOKIE = []
  cookie.forEach(function (el, i) {
    el.split(';').forEach(function (el, i) {
      if (el.match(reg_cookie)) {
        COOKIE.push(el)
      } else {
        return false
      }
    })
  })
  return COOKIE
}
