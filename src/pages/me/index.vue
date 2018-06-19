<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <!-- <button class="btn" @click="scanBook">添加图书</button> -->
    <button class="btn" v-if="!hasUserInfo && canIUse"  open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取个人信息</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  methods: {
    getUserInfo(e) {
      console.log(e)
    },
    scanBook() {
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  .userinfo {
    margin-top: 100px;
    text-align: center;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
}
</style>



