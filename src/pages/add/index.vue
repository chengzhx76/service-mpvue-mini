<template>
  <view id="add">

    <view class="main-nav">
      <view v-for="(tab, index) in tabs"
            :class="[tab.class, {active: tab.isActive}, 'nav']"
            @click="tabsSwitch(tab.class)"
            :key="tab.class">{{ tab.name }}</view>
    </view>

    <view class="main">

      <view class="tip">填写你的行程</view>

      <view class="service">
        <view class="distance">
          <view class="origin info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-car gray-icon"/>
              </view>
              <text class="label">起点</text>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="出发地" v-model="service.origin"/>
            </view>
            <view class="choose">&gt;</view>
          </view>
          <view class="destination info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-map-marker gray-icon"/>
              </view>
              <text class="label">终点</text>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="目的地" v-model="service.destination"/>
            </view>
            <view class="choose">&gt;</view>
          </view>
          <view class="time info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-clock-o gray-icon"/>
              </view>
              <text class="label">时间</text>
            </view>
            <view class="input" @click="chooseTime">
              <input placeholder-class="placeholder-color" placeholder="乘车时间" disabled v-model="service.date"/>
            </view>
            <view class="choose time-choose">&gt;</view>
            <view class="time-picker" v-if="showTimePicker">
              <picker-view class="picker day"  indicator-style="height: 50rpx;" :value="dayVal" @change="dayChange">
                <picker-view-column>
                  <view class="item" v-for="(day, index) in days" :key="index">{{ day }}</view>
                </picker-view-column>
              </picker-view>
              <picker-view class="picker time" indicator-style="height: 50rpx;" :value="timeVal" @change="timeChange">
                <picker-view-column>
                  <view class="item" v-for="(time, index) in times" :key="index">{{ time }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view class="item" v-for="(minute, index) in minutes" :key="index">{{ minute }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>
          <view class="phone info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-mobile gray-icon"/>
              </view>
              <text class="label">手机</text>
            </view>
            <view class="input">
              <input type="number" maxlength="11" placeholder-class="placeholder-color" placeholder="联系方式" v-model="service.phone"/>
            </view>
          </view>
        </view>
        <view class="remarks">
          <input placeholder-class="placeholder-color" placeholder="填写备注（选填）" v-model="service.remarks"/>
        </view>
      </view>
    </view>
    <view class="release">
      <button class="release-button" type="default" size="default" @click="addDistance" hover-class="button-hover">发布行程</button>
    </view>

  </view>
</template>

<script>

export default {
  data () {
    return {
      tabs: [
        {
          name: '乘客',
          class: 'passenger',
          isActive: true
        },
        {
          name: '车主',
          class: 'driver',
          isActive: false
        }
      ],
      service: {
        origin: '',
        destination: '',
        date: '',
        phone: '',
        remarks: ''
      },
      showTimePicker: false,
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
      ]
    }
  },
  created () {
    this.day = this.days[this.dayVal[0]]
    this.time = this.times[this.timeVal[0]]
    this.minute = this.minutes[this.timeVal[1]]
    this.service.date = `${this.day} ${this.time}:${this.minute}`
  },
  watch: {
    dayVal (val) {
      this.day = this.days[val[0]]
      this.service.date = `${this.day} ${this.time}:${this.minute}`
    },
    timeVal (val) {
      this.time = this.times[val[0]]
      this.minute = this.minutes[val[1]]
      this.service.date = `${this.day} ${this.time}:${this.minute}`
    }
  },
  components: {
  },
  methods: {
    tabsSwitch (type) {
      this.tabs.forEach(tab => {
        if (type === tab.class) {
          tab.isActive = true
        } else {
          tab.isActive = false
        }
      })
    },
    chooseTime () {
      this.showTimePicker = !this.showTimePicker
    },

    addDistance () {
      console.log(this.service)
    },
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
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  #add {
    @include height-width-100;
    @include column-align-center;
  }
  .main-nav {
    @include height-rpx-width-percent(90, 93%);
    @include border-radius(80);
    display: flex;
    margin-top: 30rpx;
    margin-bottom: 10rpx;
    @include border(1);
    background: $white;
    .nav {
      @include height-width-percent-text-center(90, 50%);
      font-size: 36rpx;
      color: $navColor;
    }
    .passenger {
      @include border-radius-left(80);
    }
    .driver {
      @include border-radius-right(80);
    }
    .active {
      background: #78B4E1;
      color: $white;
    }
  }

  .main {
    width: 93%;
    background: $pageBg;
    .tip {
      @include height-rpx-width-100(75);
      line-height: 75rpx;
      font-size: 28rpx;
      color: $tipColor;
      background: $pageBg;
    }
    .service {
      width: 100%;
      @include justify-space-between;
      background: $pageBg;
      .distance {
        width: 100%;
        @include border-radius(10);
        @include border(2);
        @include box-shadow;
        background: $white;
        .info {
          width: 100%;
          @include justify-start-align-center;
          @include border-bottom-width(1);
          .title {
            @include height-rpx-width-percent(120, 40%);
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
            width: 54%;
            input {
              text-align: right;
              padding-right: 12rpx;
            }
          }
          .choose {
            @include height-rpx-width-percent(120, 6%);
            text-align: left;
            line-height: 116rpx;
            font-size: 40rpx;
            font-weight: bold;
            color: $chooseColor;
          }
          .time-choose {
            font-size: 34rpx;
            color: $chooseColor;
          }
        }
        .origin, .destination {
          height: 120rpx;
          .input {
            font-size: 40rpx;
            color: $inputColor;
          }
        }
        .time, .phone {
          .input {
            font-size: 32rpx;
            color: $inputUnimpColor;
          }
        }
        .phone {
          height: 120rpx;
        }
        .time {
          min-height: 120rpx;
          .time-picker {
            @include height-rpx-width-100(240);
            display: flex;
            .picker {
              @include height-rpx-width-100(240);
            }
            .day {
              width: 60%;
            }
            .time {
              width: 40%;
            }
            .item {
              width: 100%;
              line-height: 75rpx;
              text-align: center
            }
          }
        }
        .phone {
          @include border-none('bottom');
        }
      }
      .remarks {
        @include height-rpx-width-100(115);
        border-radius: 10rpx;
        margin-top: 25rpx;
        padding-left: 30rpx;
        @include box-shadow;
        background: $white;
        @include border(2);
        input {
          @include height-width-100;
          font-size: 36rpx;
          color: $inputColor;
        }
      }
    }

  }
  .release {
    @include height-rpx-width-100(160);
    position: fixed;
    left: 0;
    bottom: 0;
    @include border-top-width(1);
    @include justify-align-center;
    background: $white;
  }
</style>
