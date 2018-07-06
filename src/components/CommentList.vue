<template>
  <div class="comment-list" v-show="comments">
    <title text="我的评论"></title>
    <div class="comment" v-for="comment in comments" :key="comment.id" @click="handleClick(comment)">
      <div class="user">
        <div class="userinfo">
          <img class="avatar" :src="comment.userinfo.avatarUrl" alt="">
          <div class="name">{{comment.userinfo.nickName}}</div>
        </div>
        <div class="systeminfo">
          <div class="location" v-if="comment.location">{{comment.location}}---</div>
          <div class="location" v-else>未知区域---</div>
          <div class="phone" v-if="comment.phone">来自：{{comment.phone }}</div>
          <div class="phone" v-else>来自：未知设备</div>
        </div>
      </div>
      <p class="comment-text">{{comment.comment}}</p>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title'

export default {
  props: ['comments', 'type'],
  methods: {
    handleClick(comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + comment.id
        })
      }
    }
  },
  components: {
    Title
  }
}
</script>

<style scoped lang="scss">
  .comment-list {
    .comment {
      padding: 5px 10px;
      border-bottom: 1px solid #ccc;
      .user {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .userinfo {
          display: flex;
          flex-direction: row;
          align-items: center;
          .avatar {
            flex: 0 0 20px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          .name {
            margin-left: 5px;
            font-size: 12px;
            line-height: 20px;
            color: #666;
          }
        }
        .systeminfo {
          display: flex;
          flex-direction: row;
          align-items: center;
          .phone, .location {
            font-size: 12px;
            line-height: 20px;
            color: #666;
          }
        }
      }
      .comment-text {
        font-size: 12px;
        line-height: 20px;
        color: #2d2d2d;
      }
    }
  }
</style>

