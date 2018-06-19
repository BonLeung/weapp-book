import Vue from 'vue'
import App from './App'

import '../static/css/common.scss'

Vue.config.productionTip = false

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/me/main', 'pages/books/main', 'pages/comments/main'],
    window: {
      backgroundTextStyl: 'light',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: '图书',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/icon-book.png',
          selectedIconPath: 'static/img/icon-book-active.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/icon-comments.png',
          selectedIconPath: 'static/img/icon-comments-active.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我',
          iconPath: 'static/img/icon-me.png',
          selectedIconPath: 'static/img/icon-me-active.png'
        }
      ]
    }
  }
}
