<template>
  <view id="filter">
    <view class="input">
      <input placeholder-class="placeholder-color" placeholder="乘车时间" v-model="date"/>
    </view>
    <view class="time-picker">

      <picker-view class="picker day"  indicator-style="height: 60rpx;" :value="dayVal" @change="dayChange">
        <picker-view-column style="background: darkcyan">
          <view class="item" v-for="(day, index) in days" :key="index">{{ day }}</view>
        </picker-view-column>
      </picker-view>

      <picker-view class="picker time" indicator-style="height: 60rpx;" :value="timeVal" @change="timeChange">
        <picker-view-column>
          <view class="item" v-for="(time, index) in times" :key="index">{{ time }}</view>
        </picker-view-column>
        <picker-view-column>
          <view class="item" v-for="(minute, index) in minutes" :key="index">{{ minute }}</view>
        </picker-view-column>
      </picker-view>

    </view>

  </view>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      day: '',
      time: '',
      minute: '',
      dayVal: [0],
      timeVal: [0, 1],
      days: [
        '11月08日 周四',
        '11月09日 周五',
        '11月10日 周六',
        '11月11日 周日',
        '11月12日 周一'
      ],
      times: [
        '14',
        '15',
        '16',
        '17',
        '18',
        '19'
      ],
      minutes: [
        '00',
        '15',
        '30',
        '45'
      ]
    }
  },
  created () {
    this.day = this.days[this.dayVal[0]]
    this.time = this.times[this.timeVal[0]]
    this.minute = this.minutes[this.timeVal[1]]
    this.date = `${this.day} ${this.time}:${this.minute}`
  },
  watch: {
    dayVal (val) {
      this.day = this.days[val[0]]
      this.date = `${this.day} ${this.time}:${this.minute}`
    },
    timeVal (val) {
      this.time = this.times[val[0]]
      this.minute = this.minutes[val[1]]
      this.date = `${this.day} ${this.time}:${this.minute}`
    }
  },
  methods: {
    dayChange (e) {
      this.dayVal = e.mp.detail.value
    },
    timeChange (e) {
      this.timeVal = e.mp.detail.value
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";
  @import "@/styles/mixin.scss";

  #filter {
    @include height-width-100;
  }

  .input {
    height: 100rpx;
    background: $white;
    @include border(2);
    input {
      height: 100rpx;
      line-height: 100rpx;
      padding-left: 20rpx;
    }
  }
  .time-picker {
    width: 100%;
    display: flex;
    .picker {
      width: 100%;
      height: 210rpx;
    }
    .day {
      width: 60%;
    }
    .time {
      width: 40%;
    }
    .item {
      width: 100%;
      height: 60rpx;
      line-height: 70rpx;
      text-align: center
    }
  }


</style>
