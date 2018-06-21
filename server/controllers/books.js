const axios = require('axios')
const { mysql } = require('../qcloud')
const doubanIsbnApi = 'https://api.douban.com/v2/book/isbn/'

async function all(ctx, next) {
  const books = await mysql('books').select('*')
  ctx.state.data = {
    list: books
  }
}

async function post(ctx, next) {
  const { isbn, openid } = ctx.request.body
  if (isbn && openid) {
    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      }
      return
    }
    let res = await axios.get(doubanIsbnApi + isbn)
    if (res.status === 200) {
      const bookinfo = res.data
      const rate = bookinfo.rating.average
      const { title, image, alt, publisher, summary, price } = bookinfo
      const tags = bookinfo.tags.map(item => {
        return `${item.title} ${item.count}`
      }).join(',')
      const author = bookinfo.author.join(',')
      try {
        await mysql('books').insert({
          isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
        })
        ctx.state.data = {
          title,
          msg: 'success'
        }
      } catch(e) {
        ctx.state = {
          code: -1,
          data: {
            msg: '新增失败' + e.sqlMessage
          }
        }
      }
    } else {
      ctx.state = {
        code: -1,
        data: {
          msg: '添加失败'
        }
      }
    }
  }
}

module.exports = {
  post,
  all
}
