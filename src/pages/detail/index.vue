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
    <div class="comment">
      <title text="图书评论"></title>
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
    </div>
  </div>
</template>

<script>
  import { get } from '@/utils.js'
  import Rate from '@/components/Rate'
  import Title from '@/components/Title'

  const ak = 'eYsFCtBkiUVy1odRHsBNXPSnWpPYwsrs'
  const url = 'http://api.map.baidu.com/geocoder/v2/?pois=1'

  export default {
    data() {
      return {
        id: '',
        bookinfo: null,
        comment: '',
        location: '',
        phone: ''
      }
    },
    mounted() {
      this.id = this.$root.$mp.query.id
      this.getDetail()
    },
    methods: {
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
      }
    },
    components: {
      Rate,
      Title
    }
  }
</script>

<style lang="scss">
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
  }
}
</style>
