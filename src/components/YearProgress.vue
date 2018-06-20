<template>
  <div class="progressbar">
    <progress :percent="percent" activeColor="#ea5a49"></progress>
    <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    _isLeapYear() {
      const year = new Date().getFullYear()
      if (year % 4 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    _getDayOfYear() {
      return this._isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    days() {
      // 今年第一天
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // 今天的时间戳减去今天第一天的时间戳
      let offset = Date.now() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent() {
      return (this.days * 100 / this._getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style lang="scss">
.progressbar {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  progress {
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #2d2d2d;
  }
}
</style>


