<template>
  <div class="swiper">
    <swiper
    :indicator-dots="true"
    indicator-color="#ea5a49"
    :autoplay="6000"
    :duration="1000"
    :circular="true"
    >
      <div v-for="(top, index) in tops" :key="index">
        <swiper-item>
          <img class="slide-img" mode="aspectFit" :src="top.image" alt="">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ['tops']
  }
</script>

<style lang="scss">

</style>
