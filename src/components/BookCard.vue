<template>
  <div class="book-card">
    <div class="thumb">
      <img :src="book.image" alt="" mode="scaleToFill">
    </div>
    <div class="name">{{book.title}}</div>
    <Rate :value="book.rate"></Rate>
  </div>
</template>

<script>
import Rate from '@/components/Rate'

export default {
  props: ['book', 'detailUrl'],
  components: {
    Rate
  }
}
</script>

<style lang="scss">
.book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  .thumb {
    margin: 0 auto;
    width: 90px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    width: 90px;
    padding: 5px;
    line-height: 1;
    font-size: 12px;
    color: #494949;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
