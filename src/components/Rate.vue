<template>
  <div class="rate">
    <span class="all">☆☆☆☆☆</span>
    <span class="hollow" :style="style">★★★★★</span>
    <span class="rate-num">{{value}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '0'
    }
  },
  computed: {
    style() {
      return `width: ${this.value / 2}em`
    }
  }
}
</script>

<style lang="scss">
.rate {
  position: relative;
  font-size: 10px;
  line-height: 1;
  .all {
    color: #ccc;
  }
  .hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 2em;
    overflow: hidden;
    color: #ea5149;
  }
  .rate-num {
    margin-left: 5px;
    color: #ea5149;
  }
}
</style>

