const { mysql } = require('../qcloud')

async function post(ctx, next) {
  const { bookid, comment, openid, location, phone } = ctx.request.body
  try {
    await mysql('comments').insert({ bookid, comment, openid, location, phone })
    ctx.state.data = {
      msg: 'success'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '评论失败：' + e.sqlMessage
      }
    }
  }
}

async function get(ctx, next) {
  const { bookid } = ctx.request.query
  const comments = await mysql('comments')
                          .select('comments.*', 'cSessionInfo.user_info')
                          .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
                          .where('bookid', bookid)
  console.log(comments)
  ctx.state.data = {
    list: comments.map(comment => {
      return Object.assign({}, comment, {
        userinfo: JSON.parse(comment.user_info)
      })
    })
  }
}

module.exports = {
  post,
  get
}
