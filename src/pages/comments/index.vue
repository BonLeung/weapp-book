<template>
  <div class="container">
    <comment-list :comments="comments" type="user"></comment-list>
    <div v-if="userinfo.openId">
      <title text="我的图书"></title>
      <div class="book-list">
        <li class="book-item" v-for="book in books" :key="book.id">
          <a :href="'/pages/detail/main?id=' + book.id">
            <BookCard :book="book"></BookCard>
          </a>
        </li>
      </div>
      <div v-if="!books.length">暂时还没添加过图书</div>
    </div>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import Title from '@/components/Title'
import BookCard from '@/components/BookCard'

import { get } from '@/utils'

export default {
  data() {
    return {
      userinfo: {},
      comments: [],
      books: []
    }
  },
  methods: {
    _init() {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    async getBooks() {
      const res = await get('/weapp/books', { openid: this.userinfo.openId })
      if (res.code === 0) {
        this.books = res.data.list
      }
    },
    async getComments() {
      const res = await get('/weapp/comments', { openid: this.userinfo.openId })
      if (res.code === 0) {
        this.comments = res.data.list
      }
    }
  },
  onPullDownRefresh() {
    this._init()
  },
  onShow() {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
      this._init()
    }
  },
  components: {
    CommentList,
    Title,
    BookCard
  }
}
</script>

<style scoped lang="scss">
.container {
  .book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    .book-item {
      width: 33.3%;
    }
  }
}
</style>


