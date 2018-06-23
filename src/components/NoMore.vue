<template>
  <div class="no-more">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '没有更多数据'
      }
    }
  }
</script>

<style lang="scss">
.no-more {
  width: 80%;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid #ccc;
  }
  .text {
    padding: 0 12px;
    font-size: 12px;
    color: #ccc;
  }
}
</style>

