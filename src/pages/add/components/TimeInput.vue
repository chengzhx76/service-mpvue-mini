<template>
  <view id="time-input">
    <view class="info" :class="[clazz]">
      <view class="warp" hover-class="choose-hover" @click="choose">
        <view class="title">
          <view class="icon">
            <text class="fa gray-icon" :class="[icon]"/>
          </view>
          <text class="label" :class="{ error: validate }">{{ labelText }}</text>
        </view>
        <view class="input">
          <input placeholder-class="placeholder-color" :placeholder="placeholder" disabled v-model.lazy="dateTime"/>
        </view>
      </view>
      <view class="choose-picker" v-if="showPicker">
        <picker-view class="picker left"  indicator-style="height: 50rpx;" :value="dayVal" @change="dayChange">
          <picker-view-column>
            <view class="item" v-for="(day, index) in days" :key="index">{{ day }}</view>
          </picker-view-column>
        </picker-view>
        <picker-view class="picker right" indicator-style="height: 50rpx;" :value="timeVal" @change="timeChange">
          <picker-view-column>
            <view class="item" v-for="(time, index) in times" :key="index">{{ time }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(minute, index) in minutes" :key="index">{{ minute }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
  import { formatNumber, getDay } from '@/utils/index'
  const now = new Date()
  export default {
    props: {
      type: {
        type: String,
        required: true
      },
      validate: {
        type: Boolean,
        required: true
      },
      showPicker: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        dateTime: '',
        day: '',
        time: '',
        minute: '',
        dayVal: [0],
        timeVal: [now.getHours(), now.getMinutes()],
        days: [],
        times: [],
        minutes: []
      }
    },
    methods: {
      choose () {
        this.$emit('choose', this.type)
      },
      dayChange (e) {
        this.dayVal = e.mp.detail.value
      },
      timeChange (e) {
        this.timeVal = e.mp.detail.value
      },
      emitTime () {
        if (this.type === 'time') {
          if (this.dateTime) {
            this.$emit('time', { type: this.type, time: this.dateTime })
          }
        }
        if (this.type === 'retTime') {
          if (this.dateTime === '无返程' || this.dateTime) {
            this.$emit('time', { type: this.type, time: this.dateTime })
          }
        }
      }
    },
    computed: {
      clazz () {
        return this.type === 'time' ? 'time' : 'return-time'
      },
      icon () {
        return 'fa-clock-o'
      },
      labelText () {
        return this.type === 'time' ? '时间' : '返程'
      },
      placeholder () {
        return this.type === 'time' ? '乘车时间' : '返程时间'
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
      for (let i = 0; i <= 23; i++) {
        this.times.push(formatNumber(i))
      }
      for (let i = 0; i < 60; i++) {
        this.minutes.push(formatNumber(i))
      }
      if (this.type === 'time') {
        this.days = getDay(30)
      } else {
        let dates = getDay(30)
        dates.splice(0, 0, '无返程')
        this.days = dates
      }
      this.time = this.times[this.timeVal[0]]
      this.minute = this.minutes[this.timeVal[1]]
      this.day = this.days[this.dayVal[0]]
      this.dateTime = this.day === '无返程' ? '无返程' : `${this.day} ${this.time}:${this.minute}`
    },
    watch: {
      dayVal (val) {
        this.day = this.days[val[0]]
        this.dateTime = this.day === '无返程' ? '无返程' : `${this.day} ${this.time}:${this.minute}`
        this.emitTime()
      },
      timeVal (val) {
        this.time = this.times[val[0]]
        this.minute = this.minutes[val[1]]
        this.dateTime = this.day === '无返程' ? '无返程' : `${this.day} ${this.time}:${this.minute}`
        this.emitTime()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "./index.scss";
  #time-input {
    width: 100%;
  }
  .info {
    .choose-picker {
      width: 100%;
      display: flex;
      .left {
        width: 60%;
      }
      .right {
        width: 40%;
      }
    }
  }
</style>
