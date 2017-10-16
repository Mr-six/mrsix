const { articleModel } = require('../../models').v1
const $ = require('../../utils')
const Base = require('./base')
const { schema, limitDb } = require('../../config')

let ArticleAPI = new Base({
  model: articleModel,
  search: 'title',
})

/**
 * 更改索引
 * post 参数
 * @params {Array} items 所需要更改_index的元素
 * 如：
 * items = [
 *  {
 *    id: '文章id',
 *    index: '更新后的index值'
 *  }
 * ]
 */
ArticleAPI.methods.updateIndex = async function (ctx) {
  let body = ctx.request.body
  if (body.items.length === 0) return $.result(ctx, {})
  else body.items.forEach(async (el, index) => {
    let documents = await articleModel.update({
      _id: el.id
    }, { _index: el.index })
    if (index === body.items.length - 1) { return $.result(ctx, {}) }
  })
}

/**
 * 文章创建
 * post 参数 详见 api.md
 */
ArticleAPI.methods.create = async function (ctx) {
  let body = ctx.request.body
  body.user = ctx.user._id
  const { error, value } = $.joi.validate(body, schema.article)  // 验证body对象
  if (error) return $.result(ctx, 'params error')
  const query = Object.assign({}, body)
  let documents = await articleModel.create(query)
  $.result(ctx, documents)
}


/**
 * 文章更新
 */
ArticleAPI.methods.update = async function (ctx) {
  let body = ctx.request.body
  let id = ctx.params.id
  const { error, value } = $.joi.validate(body, schema.article)  // 验证对象
  if (error) return $.result(ctx, 'params error')
  let documents = await articleModel.findOneAndUpdate({ _id: id }, value)
  if (documents === -1) $.result(ctx, 'update failed')
  $.result(ctx, documents)
}

module.exports = ArticleAPI.methods
