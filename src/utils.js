import config from './config'
import qcloud from 'wafer2-client-sdk'

export function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function(res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

export function login() {
  return new Promise((resolve, reject) => {
    qcloud.setLoginUrl(config.loginUrl)
    qcloud.login({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
