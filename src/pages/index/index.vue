<template>
  <view id="index">

    <view class="main">
      <view class="section-header">
        <swiper class="swiper-main" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
                :vertical="vertical" :interval="interval" :duration="duration">
          <swiper-item class="swiper-item" v-for="item in imgs" :key="item.id">
            <image class="swiper-img" mode="scaleToFill" :src="item.src"/>
          </swiper-item>
        </swiper>
        <view class="nav-main">
          <view class="nav">
            <view v-for="(tab, index) in tabs"
                  :class="[tab.class, {active: tab.isActive}, 'btn']"
                  @click="tabsSwitch(tab.class, tab.type)"
                  :key="tab.class"
                  hover-class="tab-hover">{{ tab.name }}</view>
          </view>
          <view class="my">
            <button class="user-info" hover-class="tab-hover" open-type="getUserInfo" @getuserinfo="showUserInfo">
              <view class="avatar-warp">
                <open-data class="avatar" type="userAvatarUrl"></open-data>
              </view>
              <view class="text">我的</view>
            </button>
          </view>
        </view>
      </view>
      <view class="search">
        <view class="search-main">

          <view class="service">
            <view class="distance">
              <view class="origin info">
                <view class="icon">
                  <text class="fa fa-car gray-icon"/>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="哪出发" v-model="service.origin"/>
                </view>
              </view>
              <view class="destination info">
                <view class="icon">
                  <text class="fa fa-lg fa-map-marker gray-icon"/>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="要去哪" v-model="service.dest"/>
                </view>
              </view>
            </view>
            <view class="change" hover-class="btn-hover" @click="exchange()">
              <text class="fa fa-1-6x fa-retweet gray-icon"/>
            </view>

          </view>
          <view class="search-btn">
            <button class="search-button" hover-class="btn-hover" @click="searchHandler">搜索顺路车程</button>
          </view>

        </view>
      </view>

    </view>
    <view class="list">
      <card-list :travels="list"/>
      <view class="bottom-block" hover-class="btn-hover" @click="moreHandler">查看更多 ></view>
      <view class="block"></view>
    </view>

    <view class="add" hover-class="btn-hover" @click="addHandler">
      <text class="icon">+</text>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CardList from '@/components/CardList/index'
  import { list, config } from '@/api/api'
  import { formatTime, formatDate } from '@/utils/index'
  export default {
    data () {
      return {
        imgs: [],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        circular: false,
        interval: 10000,
        duration: 500,
        service: {
          type: 0,
          origin: '',
          dest: ''
        },
        page: {
          pageNum: 1,
          count: 6,
          totalNum: 0
        },
        list: [],
        tabs: [
          {
            name: '全部',
            class: 'all',
            type: 0,
            isActive: true
          },
          {
            name: '乘客',
            class: 'passenger',
            type: 1,
            isActive: false
          },
          {
            name: '车主',
            class: 'driver',
            type: 2,
            isActive: false
          }
        ]
      }
    },
    components: {
      CardList
    },
    methods: {
      tabsSwitch (clazz, type) {
        this.service = {
          type: 0,
          origin: '',
          dest: ''
        }
        this.service.type = type === 0 ? 0 : type === 1 ? 2 : 1
        this.getList()
        this.tabs.forEach(tab => {
          tab.isActive = clazz === tab.class
        })
      },
      exchange () {
        if (!!this.service.origin || !!this.service.dest) {
          let temp = this.service.origin
          this.service.origin = this.service.dest
          this.service.dest = temp
        }
      },
      searchHandler () {
        let type = this.service.type === 0 ? 0 : this.service.type === 2 ? 1 : 2
        const url = `../list/main?type=${type}&origin=${this.service.origin}&dest=${this.service.dest}`
        wx.navigateTo({ url })
      },
      getList () {
        list(this.service, this.page).then(res => {
          this.list = res.data.list.map(item => {
            item['distTime'] = formatTime(item.time)
            item.time = formatDate(item.time)
            return item
          })
        })
      },
      getConfig () {
        this.imgs = []
        config(1).then(res => {
          res.data.forEach(item => {
            this.imgs.push({
              id: item.configKey,
              src: item.configValue
            })
          })
        })
      },
      addHandler () {
        const url = '../add/main'
        wx.navigateTo({ url })
      },
      moreHandler () {
        const url = '../list/main'
        wx.navigateTo({ url })
      },
      wxLogin () {
        const self = this
        wx.login({
          success (loginRes) {
            if (loginRes.code) {
              wx.getSetting({
                success (settRes) {
                  if (settRes.authSetting['scope.userInfo']) {
                    self.getWxUserInfo(loginRes.code)
                  } else {
                    self.$store.dispatch('AuthUser', loginRes.code).then(() => {
                    }).catch(error => {
                      console.log(error)
                    })
                  }
                }
              })
            } else {
              console.log('登录失败！' + loginRes.errMsg)
            }
          }
        })
      },
      getWxUserInfo (code) {
        const self = this
        wx.getUserInfo({
          success (info) {
            self.$store.dispatch('GetUser', { code, info }).then(() => {
            }).catch(error => {
              console.log(error)
            })
          }
        })
      },
      showUserInfo (info) {
        console.log(this.nickName)
        if (this.nickName) {
          const url = '../my/main'
          wx.navigateTo({ url })
        } else {
          if (info.mp.detail.errMsg.indexOf('ok') !== -1) {
            this.$store.dispatch('AddUser', info.mp.detail.userInfo).then(() => {
              const url = '../my/main'
              wx.navigateTo({ url })
            }).catch(error => {
              console.log(error)
            })
          } else {
            wx.showToast({
              title: '您拒绝了，无法获取您的信息！',
              icon: 'none',
              duration: 1300
            })
          }
        }
      },
      initFrom () {
        this.service = {
          type: 0,
          origin: '',
          dest: ''
        }
        this.page = {
          pageNum: 1,
          count: 6,
          totalNum: 0
        }
        this.tabs = [
          {
            name: '全部',
            class: 'all',
            type: 0,
            isActive: true
          },
          {
            name: '乘客',
            class: 'passenger',
            type: 1,
            isActive: false
          },
          {
            name: '车主',
            class: 'driver',
            type: 2,
            isActive: false
          }
        ]
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
      this.wxLogin()
      this.getConfig()
      this.getList()
    },
    onUnload () {
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      this.windowHeightPx = clientHeight
      this.windowWidthPx = clientWidth
      this.canvasWidthPx = Math.ceil(clientWidth * 0.9)
    },
    computed: {
      ...mapGetters([
        'nickName'
      ])
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading()
      this.initFrom()
      list(this.service, this.page).then(res => {
        this.list = res.data.list.map(item => {
          item['distTime'] = formatTime(item.time)
          item.time = formatDate(item.time)
          return item
        })
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }).catch(e => {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      })
    },
    onShareAppMessage (res) {
      console.log(res)
      return {
        title: '推荐成武拼车，快来试试~',
        path: 'pages/index/main',
        imageUrl: 'https://chengzhx76.picp.vip/index-share.jpg'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #index {
    @include height-width-100;
  }
  .main {
    @include height-rpx-width-100(725);
    .section-header {
      @include height-rpx-width-100(405);
      @include justify-align-center;
      margin-bottom: 20rpx;
      .swiper-main {
        @include height-rpx-width-100(330);
        .swiper-item {
          @include height-width-100;
          .swiper-img {
            @include height-width-100;
          }
        }
      }
      .nav-main {
        @include height-rpx-width-100(75);
        @include justify-space-between;
        background: $white;
        .nav {
          @include height-width(75, 300);
          display: flex;
          .btn {
            @include height-width-line-height-text-center(71, 100, 85);
            margin-left: 15rpx;
          }
          .active {
            width: 100rpx;
            @include border-bottom(4, $red)
          }
        }
        .my {
          /*@include height-width(75, 220);*/
           height: 75rpx;
          .user-info {
            height: 75rpx;
            @include justify-start-align-center;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            text-align: center;
            text-decoration: none;
            line-height: 75rpx;
            border-radius: 0;
            -webkit-tap-highlight-color: transparent;
            overflow: hidden;
            background-color: $white;
            .avatar-warp {
              @include height-width(55, 55);
              @include border-radius-percent(50%);
              overflow: hidden;
            }
            .text {
              height: 75rpx;
              padding-left: 10rpx;
              padding-right: 20rpx;
              line-height: 75rpx;
              font-size: 36rpx;
              color: $navColor;
            }
          }
        }
      }
    }
    .search {
      @include height-rpx-width-100(300);
      @include justify-align-center;
      background: $white;
      .search-main {
        @include height-100-width-percent(94%);
        padding-top: 15rpx;
        .service {
          @include height-rpx-width-100(172);
          @include justify-start-align-center;
          .distance {
            @include height-100-width-percent(88%);
            @include justify-start-align-center;
            .info {
              @include height-percent-width-100(49%);
              @include justify-start-align-center;
              .icon {
                @include height-100-width-percent(12%);
                @include justify-align-center;
              }
              .input {
                @include height-percent-width-percent(99%, 88%);
                @include border-bottom-width(1);
                input {
                  @include height-width-100;
                  padding-left: 12rpx;
                }
              }
            }
          }
          .change {
            @include height-100-width-percent(12%);
            @include justify-align-center;
          }
        }
        .search-btn {
          @include height-rpx-width-100(113);
          @include justify-align-center;
          .search-button {
            @include height-width-percent-text-center(80);
            font-size: 32rpx;
            color: $white;
            background: $light-blue;
          }
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .list {
    width: 100%;
  }
  .add {
    @include height-width(100, 100);
    position: fixed;
    right: 40rpx;
    bottom: 50rpx;
    @include justify-align-center;
    @include border-radius(110);
    @include box-shadow;
    background: $endColor;
    text {
      @include height-width-line-height-text-center(90, 90, 75);
      font-size: 80rpx;
      color: $white;
    }
  }
  .share-preview {
    @include height-width-100;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background:rgba(0, 0, 0, 0.5);
    @include justify-align-center;
    .share-warp {
      @include column-between;
      height: 680rpx;
      .share-img {
        image {
          @include height-width-100;
          @include border-radius(5);
        }
      }
      .save-img-btn {
        @include height-width-text-center(80, 240);
        @include border-radius(30);
        color: #446C9D;
        font-size: 32rpx;
        background: #ffffff;
      }
    }
  }
</style>
