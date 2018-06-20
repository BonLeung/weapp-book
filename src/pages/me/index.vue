<template>
  <div class="container">
    <div class="userinfo" v-if="userInfo">
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
      <year-progress></year-progress>
      <button class="btn" @click="scanBook">添加图书</button>
    </div>
    <div class="login-wrap" v-else>
      <button class="btn" v-if="!hasUserInfo && canIUse"  open-type="getUserInfo" @getuserinfo="onGetUserInfo">微信登录</button>
    </div>
  </div>
</template>

<script>
import { login } from '@/utils.js'
import YearProgress from '@/components/YearProgress'

export default {
  data() {
    return {
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  created() {
    const userInfo = wx.getStorageSync('userInfo')
    this.userInfo = userInfo
  },
  methods: {
    async onGetUserInfo(e) {
      // 拒绝授权
      if (e.mp.detail.errMsg.includes('deny')) {
        return
      }
      // 接受授权
      wx.showLoading({
        title: '正在登录...',
        mask: true
      })
      login().then(userInfo => {
        wx.hideLoading()
        wx.showToast({
          title: '授权成功',
          icon: 'success'
        })
        this.userInfo = userInfo
        wx.setStorageSync('userInfo', userInfo)
      }).catch((err) => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '授权失败',
          icon: 'success'
        })
      })
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
  },
  components: {
    YearProgress
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  .userinfo {
    margin-top: 50px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    p {
      margin-top: 10px;
      line-height: 1;
      font-size: 16px;
      color: #292929;
    }
  }
  .login-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
  }
}
</style>



