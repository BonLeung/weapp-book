const axios = require('axios')
const { mysql } = require('../qcloud')
const doubanIsbnApi = 'https://api.douban.com/v2/book/isbn/'

async function all(ctx, next) {
  const { page, size = 10, openid } = ctx.request.query
  const offset = (Number(page) - 1 || 0) * size
  const mysqlSelect = mysql('books')
                        .select('books.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'books.openid', '=', 'cSessionInfo.open_id')
                        .orderBy('books.id', 'desc')
  let books
  if (openid) {
    books = await mysqlSelect.where('books.openid', openid)
  } else {
    books = await mysqlSelect.limit(size).offset(offset)
  }
  const list = books.map(book => {
    const user_info = JSON.parse(book.user_info)
    return Object.assign({}, book, {
      user_info: {
        nickName: user_info.nickName
      }
    })
  })
  ctx.state.data = {
    list: list
  }
}

async function get(ctx, next) {
  const { id } = ctx.params
  await mysql('books').where('id', id).increment('count', 1)
  const queryRes = await mysql('books')
                      .select('books.*', 'cSessionInfo.user_info')
                      .where('id', id)
                      .join('cSessionInfo', 'books.openid', '=', 'cSessionInfo.open_id')
                      .first()
  if (queryRes.id) {
    const user_info = JSON.parse(queryRes.user_info)
    const bookinfo = Object.assign({}, queryRes, {
      tags: queryRes.tags.split(','),
      user_info: {
        nickName: user_info.nickName
      }
    })
    ctx.state.data = {
      bookinfo: bookinfo
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        msg: '查询失败'
      }
    }
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
  all,
  get
}
