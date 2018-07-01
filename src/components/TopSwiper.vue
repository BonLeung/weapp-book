<template>
  <div class="swiper">
    <swiper
    :indicator-dots="true"
    indicator-color="#ea5a49"
    :autoplay="6000"
    :duration="1000"
    :circular="true"
    >
      <div v-if="swipers.length" v-for="(swiper, swiperIndex) in swipers" :key="swiperIndex">
        <swiper-item class="swiper-item">
          <img
            v-for="book in swiper"
            :key="book.id"
            :src="book.image"
            :alt="book.title"
            class="slide-img"
            @click="bookDetail(book)"/>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ['tops'],
    computed: {
      swipers() {
        let tops = this.tops
        return [tops.slice(0, 3), tops.slice(3, 6), tops.slice(6)]
      }
    },
    methods: {
      bookDetail(book) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + book.id
        })
      }
    }
  }
</script>

<style lang="scss">
.swiper {
  margin-top: 5px;
  .swiper-item {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .slide-img {
      width: 25%;
      height: 125px;
    }
  }
}
</style>
