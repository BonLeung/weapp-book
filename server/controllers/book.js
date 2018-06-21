const axios = require('axios')

const doubanIsbnApi = 'https://api.douban.com/v2/book/isbn/'

async function post(ctx, next) {
  const { isbn, openId } = ctx.request.body
  if (isbn && openId) {
    let res = await axios.get(doubanIsbnApi + isbn)
    if (res.status === 200) {
      const bookInfo = res.data

    }
  }
}

module.exports = {
  post
}
