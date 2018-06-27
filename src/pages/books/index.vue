<template>
  <div class="books">
    <TopSwiper :tops="tops"></TopSwiper>
    <div class="book-list">
      <li class="book-item" v-for="book in books" :key="book.id">
        <a :href="'/pages/detail/main?id=' + book.id">
          <BookCard :book="book"></BookCard>
        </a>
      </li>
    </div>
    <NoMore title="没有更多数据" v-if="!more"></NoMore>
  </div>
</template>

<script>
import { get } from '@/utils.js'
import BookCard from '@/components/BookCard'
import NoMore from '@/components/NoMore'
import TopSwiper from '@/components/TopSwiper'

export default {
  data() {
    return {
      books: [],
      tops: [],
      page: 1,
      size: 15,
      more: true
    }
  },
  mounted() {
    this.getBooks(true)
    this.getTop()
  },
  onPullDownRefresh() {
    this.getBooks(true)
  },
  onReachBottom() {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getBooks()
  },
  methods: {
    async getTop() {
      const res = await get('/weapp/top')
      if (res && res.code === 0) {
        this.tops = res.data.list
      }
    },
    async getBooks(init) {
      if (init) {
        this.page = 1
        this.more = true
      }
      wx.showNavigationBarLoading()
      let res = await get('/weapp/books', {
        page: this.page,
        size: this.size
      })
      if (res.code === 0) {
        if (init) {
          this.books = res.data.list
        } else {
          this.books = this.books.concat(res.data.list)
        }
        if (res.data.list.length < this.size && this.page > 1) {
          this.more = false
        }
      }
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }
  },
  components: {
    BookCard,
    NoMore,
    TopSwiper
  }
}
</script>

<style lang="scss" scoped>
.books {
  .book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .book-item {
      width: 33.3%;
    }
  }
}
</style>

