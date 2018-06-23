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
    <div class="summary">
      <div class="title">图书简介</div>
      <p class="desc">{{bookinfo.summary}}</p>
    </div>
  </div>
</template>

<script>
  import { get } from '@/utils.js'
  import Rate from '@/components/Rate'

  export default {
    data() {
      return {
        id: '',
        bookinfo: null
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
        }
      }
    },
    components: {
      Rate
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
  .summary {
    .title {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background: #f5f5f5;
      font-size: 14px;
    }
    .desc {
      padding: 10px 15px 0;
      line-height: 20px;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
