<template>
  <div class="title">{{text}}</div>
</template>

<script>
  export default {
    props: ['text']
  }
</script>

<style scoped lang="scss">
.title {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  background: #f5f5f5;
  font-size: 14px;
}
</style>

