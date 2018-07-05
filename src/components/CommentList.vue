<template>
  <div class="comment-list">
    <title text="我的评论"></title>
    <div class="comment"></div>
  </div>
</template>

<script>
import Title from '@/components/Title'

export default {
  props: ['comments'],
  components: {
    Title
  }
}
</script>

<style lang="scss">

</style>

