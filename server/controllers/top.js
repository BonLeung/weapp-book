const { mysql } = require('../qcloud')

async function get(ctx, next) {
  const tops = await mysql('books')
                      .select('id', 'title', 'image', 'count')
                      .orderBy('count', 'desc')
                      .limit(9)
  console.log(tops)
  ctx.state.data = {
    list: tops
  }
}

module.exports = {
  get
}
