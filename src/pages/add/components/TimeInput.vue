<template>
  <view class="info" :class="[clazz]">
    <view class="warp" hover-class="choose-hover" @click="choose">
      <view class="title">
        <view class="icon">
          <text class="fa gray-icon" :class="[icon]"/>
        </view>
        <text :class="['label', { error: validate }]">{{ labelText }}</text>
      </view>
      <view class="input">
        <input placeholder-class="placeholder-color" :placeholder="placeholder" disabled v-model="dateTime"/>
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
        this.$emit('time', { type: this.type, time: this.dateTime })
      },
      timeVal (val) {
        this.time = this.times[val[0]]
        this.minute = this.minutes[val[1]]
        this.dateTime = this.day === '无返程' ? '无返程' : `${this.day} ${this.time}:${this.minute}`
        this.$emit('time', { type: this.type, time: this.dateTime })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #time-input {
    width: 100%;
  }
  .info {
    width: 100%;
    min-height: 120rpx;
    @include justify-start-align-center;
    @include border-bottom-width(1);
    background: $white;
    .warp {
      width: 100%;
      @include justify-start-align-center;
      .title {
        @include height-rpx-width-percent(120, 25%);
        color: $titleColor;
        @include justify-start-align-center;
        .icon {
          @include height-width(120, 80);
          @include justify-align-center;
        }
        .label {
          height: 120rpx;
          line-height: 115rpx;
          font-size: 34rpx;
        }
      }
      .input {
        height: 120rpx;
        width: 75%;
        font-size: 32rpx;
        color: $inputUnimpColor;
        position: relative;
        &:after {
          @include arrow(16, 25, 52);
        }
        input {
          height: 120rpx;
          text-align: right;
          padding-right: 47rpx;
        }
      }
    }
    .choose-picker {
      @include height-rpx-width-100(240);
      display: flex;
      .left {
        width: 60%;
      }
      .right {
        width: 40%;
      }
      .picker {
        @include height-rpx-width-100(240);
      }
      .item {
        width: 100%;
        line-height: 75rpx;
        text-align: center
      }
    }
  }
  .error {
    color: #CF5B56;
  }
</style>
