<template>
  <div class="detail" v-if="bookinfo">
    <div class="book-wrap">
      <div class="thumb">
        <img :src="bookinfo.image" alt="">
      </div>
      <div class="info">
        <div class="title">{{bookinfo.title}}</div>
        <div class="rate-wrap">
          <Rate :value="bookinfo.rate"></Rate>
        </div>
        <ul>
          <li><label>作者：</label>{{bookinfo.author}}</li>
          <li><label>版权：</label>{{bookinfo.publisher}}</li>
          <li><label>添加人：</label>{{bookinfo.user_info.nickName}}</li>
        </ul>
      </div>
    </div>
    <div class="tags">
      <title text="标签"></title>
      <ul class="badge-list">
        <li class="badge" v-for="(tag, index) in bookinfo.tags" :key="index">{{tag}}</li>
      </ul>
    </div>
    <div class="summary" v-if="bookinfo.summary">
      <title text="图书简介"></title>
      <p class="desc">{{bookinfo.summary}}</p>
    </div>
    <div class="share">
      <button class="btn" open-type="share">转发给好友</button>
    </div>
    <div class="comment" v-show="showAdd">
      <title text="添加评论"></title>
      <textarea class="textarea" v-model="comment" :maxlength="80" placeholder="请输入图书短评"></textarea>
      <div class="location">
        地理位置：
        <switch color="#ea5a49" :checked="location" @change="getLocation"></switch>
        <span class="text">{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color="#ea5a49" :checked="phone" @change="getPhone"></switch>
        <span class="text">{{phone}}</span>
      </div>
      <div class="btn-wrap">
        <button class="btn" @click="addComment">评论</button>
      </div>
    </div>
    <CommentList v-if="comments.length" :comments="comments"></CommentList>
  </div>
</template>

<script>
  import { get, post } from '@/utils.js'
  import Rate from '@/components/Rate'
  import Title from '@/components/Title'
  import CommentList from '@/components/CommentList'

  const ak = 'eYsFCtBkiUVy1odRHsBNXPSnWpPYwsrs'
  const url = 'http://api.map.baidu.com/geocoder/v2/?pois=1'

  export default {
    data() {
      return {
        id: '',
        bookinfo: null,
        comment: '',
        location: '',
        phone: '',
        userinfo: {},
        comments: []
      }
    },
    computed: {
      showAdd() {
        if (!this.userinfo) {
          return false
        }
        if (this.comments.filter(comment => comment.openid === this.userinfo.openId).length) {
          return false
        }
        return true
      }
    },
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: this.bookinfo.title,
        path: `pages/detail/main?id=${this.bookinfo.id}`
      }
    },
    onShow() {
      this._init()
    },
    mounted() {
      this.id = this.$root.$mp.query.id
      this.getDetail()
      const userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
      this.getComments()
    },
    methods: {
      _init() {
        this.comment = ''
        this.location = ''
        this.phone = ''
      },
      async getDetail() {
        const res = await get(`/weapp/books/${this.id}`)
        if (res && res.code === 0) {
          this.bookinfo = res.data.bookinfo
          wx.setNavigationBarTitle({
            title: res.data.bookinfo.title
          })
        }
      },
      getLocation(e) {
        if (e.target.value) {
          let _this = this
          wx.getLocation({
            success(res) {
              const location = `${res.latitude},${res.longitude}`
              wx.request({
                url,
                data: {
                  ak: ak,
                  location: location,
                  output: 'json'
                },
                success: function(res) {
                  if (res.statusCode === 200) {
                    _this.location = res.data.result.addressComponent.city
                  }
                }
              })
            }
          })
        } else {
          this.location = ''
        }
      },
      getPhone(e) {
        let _this = this
        if (e.target.value) {
          wx.getSystemInfo({
            success(phoneInfo) {
              _this.phone = phoneInfo.model
            }
          })
        } else {
          this.phone = ''
        }
      },
      async addComment() {
        const data = {
          bookid: this.id,
          comment: this.comment,
          location: this.location,
          phone: this.phone,
          openid: this.userinfo.openId
        }
        if (!data.openid) {
          wx.showToast({
            title: '您还没有登录，请先登录',
            icon: 'none'
          })
          return
        }
        if (!data.comment) {
          wx.showToast({
            title: '评论不能为空',
            icon: 'none'
          })
          return
        }
        const res = await post('/weapp/comments', { ...data })
        if (res.code === 0) {
          this.getComments()
        }
      },
      async getComments() {
        const res = await get('/weapp/comments', { bookid: this.id })
        if (res.code === 0) {
          this.comments = res.data.list
        }
      }
    },
    components: {
      Rate,
      Title,
      CommentList
    }
  }
</script>

<style scoped lang="scss">
.detail {
  .book-wrap {
    display: flex;
    flex-direction: row;
    padding: 10px;
    .thumb {
      flex: 0 0 100px;
      width: 100px;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      margin-left: 10px;
      .title {
        padding-bottom: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      .rate-wrap {
        padding-bottom: 20px;
        .rate {
          font-size: 13px;
        }
      }
      ul {
        li {
          display: flex;
          flex-direction: row;
          font-size: 12px;
          color: #666;
          label {
            white-space: nowrap;
          }
        }
      }
    }
  }
  .tags {
    .badge-list {
      padding: 0 10px;
      margin: 10px 0 5px;
      display: flex;
      flex-wrap: wrap;
      .badge {
        margin: 0 10px 5px 0;
        padding: 5px 10px;
        border: 1px solid #EA5149;
        border-radius: 5px;
        line-height: 1;
        font-size: 10px;
        color: #666;
      }
    }
  }
  .summary {
    .desc {
      padding: 10px;
      line-height: 20px;
      font-size: 12px;
      color: #666;
    }
  }
  .share {
    padding: 0 10px;
  }
  .comment {
    .textarea {
      width: 355px;
      height: 60px;
      padding: 10px;
      line-height: 15px;
      font-size: 12px;
    }
    .location {
      padding: 0 10px;
      font-size: 12px;
    }
    .phone {
      margin-top: 5px;
      padding: 0 10px;
      font-size: 12px;
    }
    .btn-wrap {
      padding: 0 10px;
      margin-top: 5px;
    }
  }
}
</style>
