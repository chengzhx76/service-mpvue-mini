<template>
  <view id="filter">
    <view class="header">

      <view class="tip">填写你的筛选条件</view>

      <view class="condition">
        <view class="origin info">
          <view class="label">出发地</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="填写出发地" v-model="filter.origin"/>
          </view>
        </view>
        <view class="destination info">
          <view class="label">目的地</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="填写目的地" v-model="filter.destination"/>
          </view>
        </view>
        <view class="type info">
          <view class="label">类型</view>
          <view class="input" @click="chooseType">
            <input placeholder-class="placeholder-color" placeholder="选择类型" disabled v-model="filter.type"/>
          </view>
          <view class="choose-picker" v-if="showTypePicker">
            <picker-view class="picker left"  indicator-style="height: 50rpx;" :value="typeVal" @change="typeChange">
              <picker-view-column>
                <view class="item" v-for="(type, index) in types" :key="index">{{ type }}</view>
              </picker-view-column>
            </picker-view>
          </view>
        </view>
        <view class="time info">
          <view class="label">出发时间</view>
          <view class="input" @click="chooseTime">
            <input placeholder-class="placeholder-color" placeholder="选择出发时间" disabled v-model="filter.date"/>
          </view>
          <view class="choose-picker" v-if="showTimePicker">
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
        <view class="number info">
          <view class="label">人数</view>
          <view class="input" @click="chooseNumber">
            <input placeholder-class="placeholder-color" placeholder="选择人数" disabled v-model="filter.number"/>
          </view>
          <view class="choose-picker" v-if="showNumPicker">
            <picker-view class="picker left"  indicator-style="height: 50rpx;" :value="numVal" @change="numChange">
              <picker-view-column>
                <view class="item" v-for="(num, index) in nums" :key="index">{{ num }}</view>
              </picker-view-column>
            </picker-view>
          </view>
        </view>
      </view>

    </view>
    <view class="footer">
      <view class="all btn" hover-class="btn-hover" @click="searchHandler('all')">全部</view>
      <view class="search btn" @click="searchHandler('condition')">搜索</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      filter: {
        date: '',
        number: '',
        type: ''
      },
      showTypePicker: false,
      showTimePicker: false,
      showNumPicker: false,
      day: '',
      time: '',
      minute: '',
      dayVal: [0],
      timeVal: [0, 0],
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
      ],
      nums: [1, 2, 3, 4, 5, 6],
      numVal: [0],
      types: ['人找车', '车找人'],
      typeVal: [0]
    }
  },
  created () {
    this.day = this.days[this.dayVal[0]]
    this.time = this.times[this.timeVal[0]]
    this.minute = this.minutes[this.timeVal[1]]
    this.filter.date = `${this.day} ${this.time}:${this.minute}`
    this.filter.number = this.nums[this.numVal[0]]
    this.filter.type = this.types[this.typeVal[0]]
  },
  watch: {
    dayVal (val) {
      this.day = this.days[val[0]]
      this.filter.date = `${this.day} ${this.time}:${this.minute}`
    },
    timeVal (val) {
      this.time = this.times[val[0]]
      this.minute = this.minutes[val[1]]
      this.filter.date = `${this.day} ${this.time}:${this.minute}`
    },
    numVal (val) {
      this.filter.number = this.nums[val[0]]
    },
    typeVal (val) {
      this.filter.type = this.types[val[0]]
    }
  },
  methods: {
    chooseType () {
      if (this.showTimePicker) {
        this.showTimePicker = false
      }
      if (this.showNumPicker) {
        this.showNumPicker = false
      }
      this.showTypePicker = !this.showTypePicker
    },
    chooseNumber () {
      if (this.showTypePicker) {
        this.showTypePicker = false
      }
      if (this.showTimePicker) {
        this.showTimePicker = false
      }
      this.showNumPicker = !this.showNumPicker
    },
    chooseTime () {
      if (this.showTypePicker) {
        this.showTypePicker = false
      }
      if (this.showNumPicker) {
        this.showNumPicker = false
      }
      this.showTimePicker = !this.showTimePicker
    },
    searchHandler () {
      const url = '../list/main'
      wx.navigateTo({ url })
    },
    typeChange (e) {
      this.typeVal = e.mp.detail.value
    },
    dayChange (e) {
      this.dayVal = e.mp.detail.value
    },
    timeChange (e) {
      this.timeVal = e.mp.detail.value
    },
    numChange (e) {
      this.numVal = e.mp.detail.value
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";
  @import "@/styles/mixin.scss";

  #filter {
    @include height-width-100;
    @include justify-space-between;
  }
  .header {
    @include height-rpx-width-100(506);
    @include column-align-center;
    /*background: darkgoldenrod;*/
    .tip {
      @include height-rpx-width-percent(50, 98%);
      line-height: 50rpx;
      font-size: 28rpx;
      color: $tipColor;
      margin-left: 2%;
      background: $pageBg;
    }
    .condition {
      /*@include height-rpx-width-100(456);*/
      width: 100%;
      background: $white;
      .info {
        /*@include height-rpx-width-100(90);*/
        width: 100%;
        @include border-bottom-width(1);
        @include justify-start-align-center;
        .label {
          @include height-width-percent-text(90, 22%, left);
          margin-left: 3%;
        }
        .input {
          @include height-rpx-width-percent(90, 75%);
          input {
            @include height-width-100-text(90, left);
            color: $inputColor;
          }
        }
      }
      .origin {
        @include border-top-width(1);
      }
      .type, .time, .number {
        min-height: 90rpx;
        .input {
          position: relative;
        }
        .input:after {
          @include arrow(10, 30, 40);
        }
        .choose-picker {
          @include height-rpx-width-100(240);
          display: flex;
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
      .time {
        .choose-picker {
          .left {
            width: 60%;
          }
          .right {
            width: 40%;
          }
        }
      }
      .type, .number {
        .choose-picker {
          width: 80%;
          margin-left: 20%;
          border-left: 1rpx solid $borderColor;
          .left {
            width: 100%;
          }
        }
      }
    }

  }

  .footer {
    @include height-rpx-width-100(99);
    position: fixed;
    left: 0;
    bottom: 0;
    @include border-top-width(1);
    z-index: 999;
    display: flex;
    background: $white;
    .btn {
      @include height-rpx-width-percent(99, 50%);
      line-height: 100rpx;
      text-align: center;
    }
    .search {
      background: $gray-blue;
      color: $white;
    }
  }
</style>
