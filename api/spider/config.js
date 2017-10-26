// 爬取信息配置
const zmz_url = 'http://www.zimuzu.tv'

module.exports = {
  header : {
    'Accept': 'text/html,application/xhtml+xml,application/xml,*/*',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
  },
  zmz: {
    index: zmz_url,   // 首页地址
    sigin_path: zmz_url + '/User/Login/ajaxLogin',  // 登录地址
    check_login: zmz_url + '/user/login/getCurUserTopInfo', // 返回用户信息
    down_load_url: zmz_url + '/resource/list/',  // 下载地址前缀

    // 用户信息 - 配置
    user: {
      account: 'account',
      password: 'password',
      remember: '1',
    },
    target_url: zmz_url + '/user/fav'
  },
}