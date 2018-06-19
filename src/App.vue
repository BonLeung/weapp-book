<script>
import qcloud from 'wafer2-client-sdk'
// import { get } from './utils.js'
import config from './config.js'

export default {
  async created() {
    // 设置登录地址
    qcloud.setLoginUrl(config.loginUrl)
    qcloud.login({
      success: function (userInfo) {
        console.log('登录成功', userInfo)
      },
      fail: function (err) {
        console.log('登录失败', err)
      }
    })
  }
}
</script>


