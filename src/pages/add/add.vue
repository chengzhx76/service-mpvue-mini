<template>
  <view id="add" :style="{ height: addHeightRpx }">
    <view class="main-nav">
      <view v-for="(tab, index) in tabs"
            :class="[tab.class, { active: tab.isActive }, 'nav']"
            @click="tabsSwitch(tab.class)"
            :key="tab.class" hover-class="choose-hover">{{ tab.name }}</view>
    </view>

    <view class="main">

      <view class="tip">填写你的行程</view>

      <view class="service">
        <view class="distance">

          <view class="origin info" @click="chooseOrigin" hover-class="choose-hover">
            <view class="title">
              <view class="icon">
                <text class="fa fa-car gray-icon"/>
              </view>
              <text :class="['label', { error: formValidate.origin }]">起点</text>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="出发地" disabled v-model="service.origin.title"/>
            </view>
          </view>

          <view class="dest info" @click="chooseDest" hover-class="choose-hover">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-map-marker gray-icon"/>
              </view>
              <text :class="['label', { error: formValidate.dest }]">终点</text>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="目的地" disabled v-model="service.dest.title"/>
            </view>
          </view>

          <view class="time info">
            <view class="warp" hover-class="choose-hover" @click="chooseTime">
              <view class="title">
                <view class="icon">
                  <text class="fa fa-clock-o gray-icon"/>
                </view>
                <text :class="['label', { error: formValidate.time }]">时间</text>
              </view>
              <view class="input">
                <input placeholder-class="placeholder-color" placeholder="乘车时间" disabled v-model="service.time"/>
              </view>
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
            <view class="warp" hover-class="choose-hover" @click="chooseNumber">
              <view class="title">
                <view class="icon">
                  <text class="fa fa-heart-o gray-icon"/>
                </view>
                <text :class="['label', { error: formValidate.number }]">{{ numberTitle }}</text>
              </view>
              <view class="input">
                <input placeholder-class="placeholder-color" placeholder="座位数" disabled v-model="service.number"/>
              </view>
            </view>
            <view class="choose-picker" v-if="showNumPicker">
              <picker-view class="picker left" indicator-style="height: 50rpx;" :value="numVal" @change="numChange">
                <picker-view-column>
                  <view class="item" v-for="(num, index) in nums" :key="index">{{ num }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>

          <view class="price info">
            <view class="warp">
              <view class="title" hover-class="choose-hover" @click="choosePay">
                <view class="icon">
                  <text class="fa fa-jpy gray-icon"/>
                </view>
                <text :class="['label', { error: formValidate.price }]">价格</text>
              </view>

              <view class="input" @click="chooseInputPay">
                <input type="number"
                       placeholder-class="placeholder-color"
                       placeholder="价格（每人）"
                       :disabled="priceDisabled"
                       v-model="service.price"
                       @focus="hidePicker"/>
              </view>
            </view>
            <view class="choose-picker" v-if="showPayPicker">
              <picker-view class="picker left" indicator-style="height: 50rpx;" :value="payVal" @change="payChange">
                <picker-view-column>
                  <view class="item" v-for="(pay, index) in pays" :key="index">{{ pay }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>

          <view class="phone info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-mobile gray-icon"/>
              </view>
              <text :class="['label', { error: formValidate.phone }]">手机</text>
            </view>
            <view class="input">
              <input type="number" maxlength="11"
                     placeholder-class="placeholder-color"
                     placeholder="联系方式"
                     @focus="hidePicker"
                     v-model="service.phone"/>
            </view>
          </view>
        </view>

        <view class="more">

          <view class="menu" :style="{borderBottomLeftRadius: menuBottomRadius, borderBottomRightRadius: menuBottomRadius}">
            <view class="title" @click="moreSwitch()">其他信息</view>
            <view class="switch">
              <switch :checked="moreSwitchNo" @change="moreSwitchState" color="#76ABEF"/>
            </view>
          </view>

          <view class="summary" v-if="summaryShow">
            <view class="via info" v-if="!isPassenger">
              <view class="title">
                <view class="icon">
                  <text class="fa fa-sm fa-level-up gray-icon"/>
                </view>
                <text class="label">途经</text>
              </view>
              <view class="input">
                <input placeholder-class="placeholder-color"
                       placeholder="途经地（选填）"
                       @focus="hidePicker"
                       v-model="service.via"/>
              </view>
            </view>

            <view class="return-time info" v-if="!isPassenger">
              <view class="warp" hover-class="choose-hover" @click="chooseRetTime">
                <view class="title">
                  <view class="icon">
                    <text class="fa fa-clock-o gray-icon"/>
                  </view>
                  <text :class="['label', { error: formValidate.returnTime }]">返程</text>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="返程时间" disabled v-model="service.returnTime"/>
                </view>
              </view>
              <view class="choose-picker" v-if="showRetTimePicker">
                <picker-view class="picker left"  indicator-style="height: 50rpx;" :value="retDayVal" @change="retDayChange">
                  <picker-view-column>
                    <view class="item" v-for="(day, index) in retDays" :key="index">{{ day }}</view>
                  </picker-view-column>
                </picker-view>
                <picker-view class="picker right" indicator-style="height: 50rpx;" :value="retTimeVal" @change="retTimeChange">
                  <picker-view-column>
                    <view class="item" v-for="(time, index) in times" :key="index">{{ time }}</view>
                  </picker-view-column>
                  <picker-view-column>
                    <view class="item" v-for="(minute, index) in minutes" :key="index">{{ minute }}</view>
                  </picker-view-column>
                </picker-view>
              </view>
            </view>

            <view class="remarks info">
              <input placeholder-class="placeholder-color" placeholder="填写备注（选填）" @focus="hidePicker" v-model="service.remarks"/>
            </view>
          </view>

        </view>

      </view>
    </view>
    <view class="release">
      <button class="release-button"
              @click="addDistance"
              :loading="loading"
              :disabled="!switches.add"
              open-type="getUserInfo"
              @getuserinfo="showUserInfo"
              hover-class="btn-hover">发布行程</button>

      <!-- <button v-if="canIUseGetUserProfile" class="release-button" hover-class="btn-hover" :loading="loading" @click="getUserProfile">立即登录</button>
      <button v-else class="release-button" open-type="getUserInfo" hover-class="btn-hover" :loading="loading" @getuserinfo="showUserInfo">立即登录</button> -->
    </view>

  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { add } from '@/api/api'
  import { formatNumber, getDay, parseDate, successToast, errorToast } from '@/utils/index'
  import { isInteger, isMoney, isAfterNow, isMobile } from '@/utils/validate'
  const now = new Date()
  export default {
    data () {
      return {
        loading: false,
        addHeightRpx: '1000rpx',
        addHeight: 1000,
        tabs: [
          {
            name: '乘客',
            class: 'passenger',
            type: 1,
            isActive: true
          },
          {
            name: '车主',
            class: 'driver',
            type: 2,
            isActive: false
          }
        ],
        numberTitle: '人数',
        service: {
          type: 1,
          origin: {
            title: '',
            lat: '',
            lng: ''
          },
          dest: {
            title: '',
            lat: '',
            lng: ''
          },
          time: '',
          number: '',
          price: '',
          phone: this.$store.getters.mobileNo,
          returnTime: '',
          via: '',
          remarks: ''
        },
        formValidate: {
          origin: false,
          dest: false,
          time: false,
          number: false,
          price: false,
          phone: false,
          returnTime: false
        },
        isPassenger: true,
        showTimePicker: false,
        showNumPicker: false,
        showPayPicker: false,
        priceDisabled: true,
        showRetTimePicker: false,
        summaryShow: false,
        moreSwitchNo: false,
        menuBottomRadius: '10rpx',
        day: '',
        time: '',
        minute: '',
        dayVal: [0],
        timeVal: [now.getHours(), now.getMinutes()],
        numVal: [0],
        payVal: [0],
        retDay: '',
        retTime: '',
        retMinute: '',
        retDayVal: [0],
        retTimeVal: [0, 0],
        days: [],
        retDays: [],
        times: [],
        minutes: [],
        nums: [1, 2, 3, 4, 5, 6],
        pays: ['面议', '自定义'],
        canIUseGetUserProfile: false
      }
    },
    created() {
      if (wx.getUserProfile) {
        this.canIUseGetUserProfile = true
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
      this.days = getDay(30)
      let dates = getDay(30)
      dates.splice(0, 0, '无返程')
      this.retDays = dates
      this.day = this.days[this.dayVal[0]]
      this.time = this.times[this.timeVal[0]]
      this.minute = this.minutes[this.timeVal[1]]
      this.service.time = `${this.day} ${this.time}:${this.minute}`
      this.service.number = this.nums[this.numVal[0]]
      this.service.price = this.pays[this.payVal[0]]
      this.priceDisabled = this.pays[this.payVal[0]] === '面议'
      this.retDay = this.retDays[this.retDayVal[0]]
      this.retTime = this.times[this.retTimeVal[0]]
      this.retMinute = this.minutes[this.retTimeVal[1]]
      this.service.returnTime = this.retDay === '无返程' ? '无返程' : `${this.retDay} ${this.retTime}:${this.retMinute}`
    },
    onUnload () {
      // TODO 保存本地

      Object.assign(this.$data, this.$options.data())
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      this.addHeight = clientHeight * rpxR + 160 + 60
    },
    watch: {
      dayVal (val) {
        this.day = this.days[val[0]]
        this.service.time = `${this.day} ${this.time}:${this.minute}`
      },
      timeVal (val) {
        this.time = this.times[val[0]]
        this.minute = this.minutes[val[1]]
        this.service.time = `${this.day} ${this.time}:${this.minute}`
      },
      numVal (val) {
        this.service.number = this.nums[val[0]]
      },
      payVal (val) {
        this.service.price = this.pays[val[0]] === '自定义' ? '' : this.pays[val[0]]
        this.priceDisabled = this.pays[val[0]] === '面议'
      },
      retDayVal (val) {
        this.retDay = this.retDays[val[0]]
        this.service.returnTime = this.retDay === '无返程' ? '无返程' : `${this.retDay} ${this.retTime}:${this.retMinute}`
      },
      retTimeVal (val) {
        this.retTime = this.times[val[0]]
        this.retMinute = this.minutes[val[1]]
        this.service.returnTime = this.retDay === '无返程' ? '无返程' : `${this.retDay} ${this.retTime}:${this.retMinute}`
      },
      addHeight (val) {
        this.addHeightRpx = `${val}rpx`
      },
      'service.origin' (val) {
        if (!!val && this.formValidate.origin) {
          this.formValidate.origin = false
        }
      },
      'service.dest' (val) {
        if (!!val && this.formValidate.dest) {
          this.formValidate.dest = false
        }
      },
      'service.time' (val) {
        if (!!val && this.formValidate.time) {
          this.formValidate.time = false
        }
      },
      'service.number' (val) {
        if (!!val && this.formValidate.number) {
          this.formValidate.number = false
        }
      },
      'service.price' (val) {
        if (!!val && this.formValidate.price) {
          this.formValidate.price = false
        }
      },
      'service.phone' (val) {
        if (!!val && this.formValidate.phone) {
          this.formValidate.phone = false
        }
      },
      moreSwitchNo (val) {
        if (!val) {
          this.formValidate.returnTime = false
        }
      },
      'service.returnTime' (val) {
        if (!!val && this.formValidate.returnTime) {
          this.formValidate.returnTime = false
        }
      }
    },
    components: {
    },
    onShow () {
      if (this.$mp.page.data && this.$mp.page.data.extend && this.$mp.page.data.extend.position) {
        const posType = this.$mp.page.data.extend.posType
        const title = this.$mp.page.data.extend.position.title
        const { lat, lng } = this.$mp.page.data.extend.position.location
        if (posType === '1') {
          this.service.origin = {
            title: title,
            lat: lat,
            lng: lng
          }
        } else if (posType === '2') {
          this.service.dest = {
            title: title,
            lat: lat,
            lng: lng
          }
        }
        this.$mp.page.setData({
          extend: null
        })
      }
    },
    methods: {
      tabsSwitch (clazz) {
        this.tabs.forEach(tab => {
          if (clazz === tab.class) {
            if (tab.class === 'passenger') {
              this.isPassenger = true
              this.numberTitle = '人数'
              this.moreSwitchOff('passenger')
            } else {
              this.isPassenger = false
              this.numberTitle = '余座'
              this.moreSwitchOff('driver')
            }
            this.service.type = tab.type
            tab.isActive = true
          } else {
            tab.isActive = false
          }
        })
      },
      hidePicker () {
        if (this.showTimePicker || this.showNumPicker || this.showPayPicker || this.showRetTimePicker) {
          this.addHeight -= 240
        }
        this.showTimePicker = false
        this.showNumPicker = false
        this.showPayPicker = false
        this.showRetTimePicker = false
      },
      chooseOrigin () {
        this.hidePicker()
        const url = '../position/main?posType=1'
        wx.navigateTo({ url })
      },
      chooseDest () {
        this.hidePicker()
        const url = '../position/main?posType=2'
        wx.navigateTo({ url })
      },
      chooseTime () {
        if (this.showNumPicker) {
          this.showNumPicker = false
        }
        if (this.showPayPicker) {
          this.showPayPicker = false
        }
        if (this.showRetTimePicker) {
          this.showRetTimePicker = false
        }
        this.showTimePicker = !this.showTimePicker
        if (this.showTimePicker) {
          this.addHeight += 240
        } else {
          this.addHeight -= 240
        }
      },
      chooseNumber () {
        if (this.showTimePicker) {
          this.showTimePicker = false
        }
        if (this.showPayPicker) {
          this.showPayPicker = false
        }
        if (this.showRetTimePicker) {
          this.showRetTimePicker = false
        }
        this.showNumPicker = !this.showNumPicker
        if (this.showNumPicker) {
          this.addHeight += 240
        } else {
          this.addHeight -= 240
        }
      },
      choosePay () {
        if (this.showTimePicker) {
          this.showTimePicker = false
        }
        if (this.showNumPicker) {
          this.showNumPicker = false
        }
        if (this.showRetTimePicker) {
          this.showRetTimePicker = false
        }
        this.showPayPicker = !this.showPayPicker
        if (this.showPayPicker) {
          this.addHeight += 240
        } else {
          this.addHeight -= 240
        }
      },
      chooseInputPay () {
        if (this.priceDisabled) {
          if (this.showTimePicker) {
            this.showTimePicker = false
          }
          if (this.showNumPicker) {
            this.showNumPicker = false
          }
          if (this.showRetTimePicker) {
            this.showRetTimePicker = false
          }
          this.showPayPicker = !this.showPayPicker
          if (this.showPayPicker) {
            this.addHeight += 240
          } else {
            this.addHeight -= 240
          }
        }
      },
      chooseRetTime () {
        if (this.showTimePicker) {
          this.showTimePicker = false
        }
        if (this.showNumPicker) {
          this.showNumPicker = false
        }
        if (this.showPayPicker) {
          this.showPayPicker = false
        }
        this.showRetTimePicker = !this.showRetTimePicker
        if (this.showRetTimePicker) {
          this.addHeight += 240
        } else {
          this.addHeight -= 240
        }
      },
      moreSwitch () {
        this.moreSwitchNo = !this.moreSwitchNo
        this.changeSwitchBox(this.moreSwitchNo)
      },
      addDistance () {
        if (this.loading) {
          return
        }
        this.loading = true
        if (!this.service.origin.title) {
          this.formValidate.origin = true
        }
        if (!this.service.dest.title) {
          this.formValidate.dest = true
        }
        if (!this.service.time || !isAfterNow(parseDate(this.service.time))) {
          this.formValidate.time = true
        }
        if (!this.service.number || !isInteger(this.service.number)) {
          this.formValidate.number = true
        }
        if (this.service.price !== '面议' && !isMoney(this.service.price)) {
          this.formValidate.price = true
        }
        if (!this.service.phone || !isMobile(this.service.phone)) {
          this.formValidate.phone = true
        }
        if (this.moreSwitchNo && this.service.type === 2) {
          if (this.service.returnTime !== '无返程' && !isAfterNow(parseDate(this.service.returnTime))) {
            this.formValidate.returnTime = true
          }
        }
        if (this.formValidate.origin || this.formValidate.dest ||
          this.formValidate.time || this.formValidate.number ||
          this.formValidate.price || this.formValidate.phone ||
          this.formValidate.returnTime) {
          this.loading = false
          return
        }

        const travel = {
          type: this.service.type,
          origin: this.service.origin,
          dest: this.service.dest,
          time: parseDate(this.service.time),
          number: this.service.number,
          price: this.service.price === '面议' ? '-1' : this.service.price,
          phone: this.service.phone,
          returnTime: this.moreSwitchNo ? (this.service.returnTime === '无返程' ? '' : parseDate(this.service.returnTime)) : '',
          via: this.moreSwitchNo ? this.service.via : '',
          remarks: this.moreSwitchNo ? this.service.remarks : ''
        }

        add(travel).then(res => {
          this.loading = false
          if (res.meta.code === 2000) {
            successToast('添加成功')
            setTimeout(() => {
              const url = '../index/main'
              wx.redirectTo({ url })
            }, 1500)
          } else {
            errorToast('添加失败')
          }
        }).catch(e => {
          this.loading = false
        })
      },
      dayChange (e) {
        this.dayVal = e.mp.detail.value
      },
      timeChange (e) {
        this.timeVal = e.mp.detail.value
      },
      numChange (e) {
        this.numVal = e.mp.detail.value
      },
      payChange (e) {
        this.payVal = e.mp.detail.value
      },
      moreSwitchState (e) {
        const val = e.mp.detail.value
        this.moreSwitchNo = val
        this.changeSwitchBox(val)
        this.hidePicker()
      },
      changeSwitchBox (val) {
        if (val) {
          if (this.isPassenger) {
            this.addHeight += 330
          } else {
            this.addHeight += 550
          }
          this.menuBottomRadius = '0'
          this.summaryShow = true
        } else {
          if (this.isPassenger) {
            this.addHeight -= 330
          } else {
            this.addHeight -= 550
          }
          this.summaryShow = false
          this.menuBottomRadius = '10rpx'
        }
      },
      moreSwitchOff (type) {
        if (this.moreSwitchNo) {
          if (type === 'passenger') {
            this.addHeight -= 550
          }
          if (type === 'driver') {
            this.addHeight -= 330
          }
        }
        this.moreSwitchNo = false
        this.summaryShow = false
        this.menuBottomRadius = '10rpx'
        this.hidePicker()
      },
      retDayChange (e) {
        this.retDayVal = e.mp.detail.value
      },
      retTimeChange (e) {
        this.retTimeVal = e.mp.detail.value
      },
      showUserInfo (info) {
        if (this.nickName) {
          this.addDistance()
        } else {
          if (info.mp.detail.errMsg.indexOf('ok') !== -1) {
            this.$store.dispatch('AddUser', info.mp.detail.userInfo).then(() => {
              this.addDistance()
            }).catch(error => {
              console.log(error)
            })
          } else {
            errorToast('您拒绝了，无法发布行程！')
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'nickName',
        'switches'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  .release-button {
    @include height-width-percent-text-center(100, 90%);
    background: $gray-blue;
    border-radius: 60rpx;
    color: $white;
  }

  #add {
    width: 100%;
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

        /* info */

        .origin, .dest {
          height: 120rpx;
          .input {
            font-size: 40rpx;
            color: $inputColor;
          }
        }
        .number, .price {
          min-height: 120rpx;
        }
        .number, .price, .phone {
          .input {
            font-size: 32rpx;
            color: $inputUnimpColor;
          }
        }
        .origin, .dest, .number, .price {
          .input {
            position: relative;
          }
          .input:after {
            @include arrow(16, 25, 52);
          }
        }
        .number {
          .choose-picker {
            width: 80%;
            margin-left: 20%;
            border-left: 1rpx solid $borderColor;
            .left {
              width: 100%;
            }
          }
        }
        .price {
          .choose-picker {
            width: 80%;
            margin-left: 20%;
            border-left: 1rpx solid $borderColor;
            .left {
              width: 100%;
            }
          }
          .warp {
            .title {
              width: 65%;
            }
            .input {
              width: 35%;
            }
          }
        }
        .phone {
          height: 120rpx;
        }
      }
    }

  }

  .more {
    width: 100%;
    @include justify-align-center;
    margin-top: 25rpx;
    .menu {
      @include height-rpx-width-100(90);
      @include justify-space-between;
      @include border-radius-top(10);
      @include border-top-width(1);
      @include border-bottom-width(1);
      background: $white;
      .title {
        @include height-width(90, 200);
        font-size: 30rpx;
        line-height: 90rpx;
        text-indent: 10rpx;
        color: $unimpColor;
        /*background: darkgray;*/
      }
      .switch {
        @include height-width(90, 115);
        @include justify-align-center;
        /*background: darkcyan;*/
      }
    }
    .summary {
      width: 100%;
      background: $white;
      @include border-radius-bottom(10);
      .via {
        height: 120rpx;
      }
      .remarks {
        height: 120rpx;
        @include border-radius-bottom(10);
        input {
          @include height-width-100;
          font-size: 36rpx;
          padding-left: 20rpx;
          color: $inputColor;
        }
      }
    }
  }

  .distance, .more {
    .info {
      width: 100%;
      @include justify-start-align-center;
      @include border-bottom-width(1);
      .warp {
        width: 100%;
        @include justify-start-align-center;
      }
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
        /*.text {
          @include height-width-100-text(120, right);
          height: 120rpx;

          background: darkorange;
          padding-right: 47rpx;
        }*/
        input {
          height: 120rpx;
          text-align: right;
          padding-right: 47rpx;
        }
      }
    }
    .time, .return-time, .via {
      .input {
        font-size: 32rpx;
        color: $inputUnimpColor;
      }
    }
    .time, .return-time {
      min-height: 120rpx;
      .input {
        position: relative;
      }
      .input:after {
        @include arrow(16, 25, 52);
      }
      .choose-picker {
        .left {
          width: 60%;
        }
        .right {
          width: 40%;
        }
      }
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

  .release {
    @include height-rpx-width-100(159);
    position: fixed;
    left: 0;
    bottom: 0;
    @include border-top-width(1);
    @include justify-align-center;
    z-index: 999;
    background: $white;
  }
  .error {
    color: #CF5B56;
  }
</style>
