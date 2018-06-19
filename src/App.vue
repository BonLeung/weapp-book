<script>
import qcloud from 'wafer2-client-sdk'
// import { get } from './utils.js'
import config from './config.js'

export default {
  data() {
    return {

    }
  },
  async created() {
    // 设置登录地址
    qcloud.setLoginUrl(config.loginUrl)
    await qcloud.login({
      success: function (userInfo) {
        console.log('登录成功', userInfo)
        wx.setStorageSync('userInfo', userInfo)
      },
      fail: function (err) {
        console.log('登录失败', err)
      }
    })
  }
}
</script>


