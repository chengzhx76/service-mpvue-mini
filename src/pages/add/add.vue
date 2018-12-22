<template>
  <view id="add">
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

          <choose-input type="origin" :validate="formValidate.origin" :location="service.origin" @address="getAddress"/>

          <choose-input type="dest" :validate="formValidate.dest"  :location="service.dest" @address="getAddress"/>

          <time-input type="time" :validate="formValidate.time" :showPicker="showPicker.time" @choose="chooseTime" @time="getTime"/>

          <number-input type="number" :labelText="numberTitle" :validate="formValidate.number" :showPicker="showPicker.number" @choose="chooseNumber" @number="getNumber"/>

          <price-input type="price" :validate="formValidate.price" :showPicker="showPicker.price" @choose="choosePrice" @number="getPrice"/>

          <phone-input type="phone" :validate="formValidate.phone" @number="getPhone"/>

        </view>

        <view class="more">

          <view class="menu" :style="{borderBottomLeftRadius: menuBottomRadius, borderBottomRightRadius: menuBottomRadius}">
            <view class="title" @click="moreSwitch()">其他信息</view>
            <view class="switch">
              <switch :checked="moreSwitchNo" @change="moreSwitchState" color="#76ABEF"/>
            </view>
          </view>

          <view class="summary" v-if="summaryShow">
            <via-input type="via" @via="getVia" v-if="!isPassenger"/>

            <time-input type="retTime" :validate="formValidate.retTime" :showPicker="showPicker.retTime" @choose="chooseTime" @time="getTime" v-if="!isPassenger"/>

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
    </view>

  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ChooseInput from './components/ChooseInput'
  import TimeInput from './components/TimeInput'
  import NumberInput from './components/NumberInput'
  import PriceInput from './components/PriceInput'
  import PhoneInput from './components/PhoneInput'
  import ViaInput from './components/ViaInput'
  import { add } from '@/api/api'
  import { parseDate, successToast, errorToast } from '@/utils/index'
  import { isInteger, isMoney, isAfterNow, isMobile } from '@/utils/validate'
  export default {
    data () {
      return {
        loading: false,
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
          phone: '',
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
        summaryShow: false,
        moreSwitchNo: false,
        menuBottomRadius: '10rpx',
        // ======================================
        showPicker: {
          time: false,
          retTime: false,
          number: false,
          price: false
        }
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    },
    watch: {
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
      ChooseInput,
      TimeInput,
      NumberInput,
      PriceInput,
      ViaInput,
      PhoneInput
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
      moreSwitchState (e) {
        const val = e.mp.detail.value
        this.moreSwitchNo = val
        this.changeSwitchBox(val)
        this.hidePicker()
      },
      changeSwitchBox (val) {
        if (val) {
          this.menuBottomRadius = '0'
          this.summaryShow = true
        } else {
          this.summaryShow = false
          this.menuBottomRadius = '10rpx'
        }
      },
      moreSwitchOff (type) {
        this.moreSwitchNo = false
        this.summaryShow = false
        this.menuBottomRadius = '10rpx'
        this.hidePicker()
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
      },
      // ===============================================
      getAddress ({ posType, location }) {
        console.log('===>getAddress')
        console.log(location)
        if (posType === 'origin') {
          this.service.origin = location
        }
        if (posType === 'dest') {
          this.service.dest = location
        }
      },
      chooseTime (type) {
        if (type === 'time') {
          if (this.showPicker.retTime) {
            this.showPicker.retTime = false
          }
          this.showPicker.time = !this.showPicker.time
        }
        if (type === 'retTime') {
          if (this.showPicker.time) {
            this.showPicker.time = false
          }
          this.showPicker.retTime = !this.showPicker.retTime
        }
      },
      getTime ({ type, time }) {
        console.log(time)
        if (type === 'time') {
          this.service.time = time
        } else {
          this.service.returnTime = time
        }
      },
      chooseNumber (type) {
        if (type === 'number') {
          this.showPicker.number = !this.showPicker.number
        }
      },
      getNumber (number) {
        console.log(number)
        this.service.number = number
      },
      choosePrice (type) {
        if (type === 'price') {
          this.showPicker.price = !this.showPicker.price
        }
      },
      getPrice (price) {
        console.log(price)
        this.service.price = price
      },
      getPhone (phone) {
        console.log(phone)
        this.service.phone = phone
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
      }
      .switch {
        @include height-width(90, 115);
        @include justify-align-center;
      }
    }
    .summary {
      width: 100%;
      background: $white;
      @include border-radius-bottom(10);
      .remarks {
        @include height-rpx-width-100(120);
        @include border-radius-bottom(10);
        @include justify-start-align-center;
        @include border-bottom-width(1);
        input {
          @include height-width-100;
          font-size: 36rpx;
          padding-left: 20rpx;
          color: $inputColor;
        }
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
    .release-button {
      @include height-width-percent-text-center(100, 90%);
      background: $gray-blue;
      border-radius: 60rpx;
      color: $white;
    }
  }
</style>
