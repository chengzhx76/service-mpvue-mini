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
          <view class="my" hover-class="tab-hover"></view>
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

      <base-card v-for="(travel, index) in list" :travel="travel" :key="travel.id"/>

      <view class="bottom-block" hover-class="btn-hover" @click="moreHandler">
        查看更多 >
      </view>

    </view>

    <view class="add" hover-class="btn-hover" @click="addHandler">
      <text class="icon">+</text>
    </view>

    <view style="position: absolute; top: -9999px; left: -9999px;">
      <canvas canvas-id="shareImg" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>
    </view>
    <view class='share-preview' v-if="showShareImg" @click="closeShareImgMode()">
      <view class="share-warp" :style="{width: canvasWidthPx + 'px'}">
        <view class="share-img" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}">
          <image :src='src'/>
        </view>
        <view class="save-img-btn" @click="saveShareImg()">保存图片</view>
      </view>
    </view>
  </view>
</template>

<script>
  import BaseCard from '@/components/BaseCard/index'
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
        ],
        showShareImg: false,
        src: '',
        canvasHeightPx: 260,
        canvasWidthPx: 200,
        windowHeightPx: 0,
        windowWidthPx: 0
      }
    },
    components: {
      BaseCard
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
      myHandler () {
        const url = '../draw/main'
        wx.navigateTo({ url })
      },
      moreHandler () {
        const url = '../list/main'
        wx.navigateTo({ url })
      },
      createShareImg (val) {
        wx.showLoading({
          title: '加载中...'
        })
        this.src = ''
        this.showShareImg = true
        this.drawImg(val.type, val.origin, val.dest, val.time).then(() => {
          setTimeout(() => {
            this.createImg()
            wx.hideLoading()
          }, 500)
        })
      },
      saveShareImg () {
        const self = this
        wx.saveImageToPhotosAlbum({
          filePath: self.src,
          success (res) {
            self.showShareImg = false
            wx.showModal({
              content: '图片已保存到相册',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                }
              }
            })
          }
        })
      },
      closeShareImgMode () {
        this.showShareImg = false
      },
      drawImg (type, origin, dest, time) {
        const self = this
        let qr = new Promise(function (resolve, reject) {
          wx.getImageInfo({
            src: '../../img/gh_a53167bbfa26_258.jpg',
            success: function (res) {
              resolve(res)
            },
            fail: function (error) {
              console.error(error)
            }
          })
        })

        return new Promise(function (resolve, reject) {
          try {
            Promise.all([qr]).then(res => {
              const ctx = wx.createCanvasContext('shareImg')
              ctx.setFillStyle('#F8FCFF')
              ctx.fillRect(0, 0, self.canvasWidthPx, 170)

              ctx.beginPath()
              ctx.setFillStyle('#FFFFFF')
              ctx.fillRect(0, 170, self.canvasWidthPx, 90)

              ctx.beginPath()
              ctx.setStrokeStyle('#E5E5E5')
              ctx.setLineWidth(1)
              ctx.moveTo(10, 170)
              ctx.lineTo(self.canvasWidthPx - 10, 170)
              ctx.stroke()

              ctx.beginPath()
              ctx.setTextAlign('center')
              ctx.setFillStyle('#26548D')
              ctx.setFontSize(22)
              if (type === 1) {
                ctx.fillText('人找车', self.canvasWidthPx * 0.5, 35)
              } else {
                ctx.fillText('车找人', self.canvasWidthPx * 0.5, 35)
              }
              ctx.beginPath()
              ctx.setTextAlign('right')
              ctx.setFillStyle('#26548D')
              ctx.setFontSize(18)
              ctx.fillText('起点：', self.canvasWidthPx * 0.25, 70)
              ctx.fillText('终点：', self.canvasWidthPx * 0.25, 100)
              ctx.fillText('时间：', self.canvasWidthPx * 0.25, 130)

              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#0A1519')
              ctx.setFontSize(18)
              ctx.fillText(origin, self.canvasWidthPx * 0.25, 70)
              ctx.fillText(dest, self.canvasWidthPx * 0.25, 100)
              ctx.fillText(time, self.canvasWidthPx * 0.25, 130)

              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#ACACAC')
              ctx.setFontSize(14)
              ctx.fillText('长按识别小程序码，联系TA', self.canvasWidthPx * 0.08, 200)
              ctx.fillText('分享来自「成武拼车」', self.canvasWidthPx * 0.08, 226)

              ctx.drawImage('../../' + res[0].path, self.canvasWidthPx - 80, 180, 70, 70)
              ctx.draw()
              resolve()
            })
          } catch (error) {
            console.log(error)
            reject(error)
          }
        })
      },
      createImg () {
        let self = this
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: self.canvasWidthPx,
          height: self.canvasHeightPx,
          destWidth: self.canvasWidthPx * 2,
          destHeight: self.canvasHeightPx * 2,
          canvasId: 'shareImg',
          success: function (res) {
            self.src = res.tempFilePath
          },
          fail: function (res) {
            console.log(res)
          }
        })
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
        this.showShareImg = false
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
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
        path: 'pages/index/main'
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
          @include height-width-text-center(75, 200);
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
    min-height: 490rpx;
    margin-bottom: 50rpx;
    @include justify-center;
    .bottom-block {
      @include height-rpx-width-percent(89, 98%);
      margin-bottom: 50rpx;
      line-height: 89rpx;
      font-size: 34rpx;
      color: $light-blue;
      text-align: center;
      @include border-top-width(1);
      @include border-radius-bottom(10);
      background: $white;
    }
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
        @include height-width-text-center(80, 240)
        @include border-radius(30);
        color: #446C9D;
        font-size: 32rpx;
        background: #ffffff;
      }
    }
  }
</style>
