import Vue from 'vue'
import Book from './index'

const app = new Vue(Book)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true
  }
}
