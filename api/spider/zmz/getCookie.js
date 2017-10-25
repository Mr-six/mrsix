const axios  = require('axios')
const config = require('../config')
const $      = require('../../../utils')
// const redis  = require('../../../utils/redis')
const querystring = require('querystring')

let headers = {'Content-Type': 'application/x-www-form-urlencoded'}

Object.assign(headers, config.header)

// $.info(headers)

let user = {
  account: '582497915@qq.com',
  password: 'Zsin90=1!m',
}


async function getCookie (user) {
  let userStr = querystring.stringify(user)
  let Cookie
  let Cookie = await redis.getVal(user.account)
  if (Cookie) {
    let {data} = await axios.post(config.zmz.check_login, {headers, Cookie})
    $.debug(data)
    if (data.status === 1) return Cookie
  }
  $.debug(userStr)
  let res = await axios.post(config.zmz.sigin_path, userStr, {headers})
  $.debug(res)
  if (res.data.status !== 1) return false
  Cookie = res.headers['set-cookie']
  $.info(Cookie)
  await redis.setKey(user.account, Cookie)
  return Cookie
}

getCookie(user)
