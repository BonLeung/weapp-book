<template>
  <div class="books">
    <div class="book-list">
      <BookCard v-for="book in books" :key="book.id" :book="book"></BookCard>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils.js'
import BookCard from '@/components/BookCard'

export default {
  data() {
    return {
      books: []
    }
  },
  mounted() {
    this._getBooks()
  },
  methods: {
    async _getBooks() {
      let res = await get('/weapp/books/all')
      if (res.code === 0) {
        this.books = res.data.list
      }
    }
  },
  components: {
    BookCard
  }
}
</script>

<style lang="scss" scoped>
.books {
  .book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>

