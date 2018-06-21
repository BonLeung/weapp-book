import config from './config'
import qcloud from 'wafer2-client-sdk'

async function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url: config.host + url,
      success: function(res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function get(url) {
  return request(url, 'GET')
}

export function post(url, data) {
  return request(url, 'POST', data)
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
