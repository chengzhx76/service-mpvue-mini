<template>
  <view id="list">
    <view class="nav-main">
      <view class="nav">
        <view v-for="(tab, index) in tabs"
              :class="[tab.class, {active: tab.isActive}, 'btn']"
              @click="tabsSwitch(tab.class)"
              :key="tab.class"
              hover-class="tab-hover">{{ tab.name }}</view>
      </view>
      <view class="filter" hover-class="filter-hover" @click="filterHandler()">筛选</view>
    </view>
    <scroll-view scroll-y class="list" :style="{height: listHeight}" @scroll="scroll">

      <view class="refresh" v-if="show">{{ text }}</view>
      <view :style="{height: blockHeight + 'rpx'}"></view>

      <view class="card" v-for="(item, index) in list" :key="item.id">
        <view class="header">
          <view :class="[item.type === 2 ? 'driver' : 'passenger', 'nav-block']"></view>
          <view class="nav-info">
            <view class="tag">{{ item.type === 2 ? '车找人' : '人找车'}}</view>
            <view class="seats" v-if="item.type === 2">剩余{{ item.num }}座</view>
            <view class="seats" v-if="item.type === 1">{{ item.num }}人</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">{{ item.origin }}</view>
            </view>
            <view class="road address" v-if="!!item.via">
              <view class="icon">
                <view class="nav">经</view>
              </view>
              <text class="text">{{ item.via }}</text>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">{{ item.dest }}</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">{{ item.time }}</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price" v-if="item.price !== '-1'">
                <text class="money">{{ item.price }}</text>
                <text class="unit">/人</text>
              </view>
              <view class="price" v-else>
                <text class="money">面议</text>
              </view>
              <view class="note">{{ item.distTime }}</view>
            </view>
            <view class="share">
              <view class="icon" @click="chooseShare(item)">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone" @click="phoneCall(item.mobileNo)">联系TA</text>
        </view>
      </view>

      <view class="bottom-block" hover-class="btn-hover" @click="bottomHandler">{{ bottomText }}</view>
      <view class="block"></view>
    </scroll-view>

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
  import { list } from '@/api/api'
  import { formatTime, formatDate } from '@/utils/index'

  export default {
    components: {
    },

    data () {
      return {
        listHeight: '370rpx',
        type: 'all',
        tabs: [
          {
            name: '全部',
            class: 'all',
            isActive: true
          },
          {
            name: '乘客',
            class: 'passenger',
            isActive: false
          },
          {
            name: '车主',
            class: 'driver',
            isActive: false
          }
        ],
        list: [],
        service: {
          type: 'all',
          origin: '',
          dest: '',
          date: '',
          number: ''
        },
        page: {
          pageSize: 1,
          count: 10,
          totalNum: 0,
          hasMore: true
        },
        bottomText: '查看更多 >',
        blockHeight: 0,
        preScrollTop: 0,
        show: false,
        loading: false,
        text: '下拉加载~~~',
        showShareImg: false,
        src: '',
        canvasHeightPx: 260,
        canvasWidthPx: 200,
        windowHeightPx: 0,
        windowWidthPx: 0
      }
    },
    methods: {
      tabsSwitch (type) {
        this.type = type
        this.getList()
        this.tabs.forEach(tab => {
          tab.isActive = type === tab.class
        })
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

      chooseShare (item) {
        const self = this
        wx.showActionSheet({
          itemList: ['分享到好友', '生成图片 保存分享'],
          success (res) {
            if (res.tapIndex === 0) {
              console.log('分享给好友')
            } else if (res.tapIndex === 1) {
              self.createShareImg(item)
            }
          },
          fail (res) {
            console.log(res.errMsg)
          }
        })
      },
      phoneCall (phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },

      filterHandler () {
        const url = '../filter/main'
        wx.navigateTo({ url })
      },
      scroll (e) {
        let scrollTop = e.mp.detail.scrollTop
        // 说明是在下拉
        if (scrollTop < 0 && scrollTop < this.preScrollTop) {
          if (!this.loading) {
            this.loading = true
            this.text = '加载中~~~'
            this.show = true
            this.blockHeight = 60
            setTimeout(() => {
              list(this.service, this.page).then(res => {
                this.list = res.data.list.map(item => {
                  item['distTime'] = formatTime(item.time)
                  item.time = formatDate(item.time)
                  return item
                })
                this.text = '加载完成~~~'
                setTimeout(() => {
                  this.loading = false
                  this.blockHeight = 0
                  this.show = false
                  this.text = '下拉加载~~~'
                }, 1500)
              })
            }, 500)
          }
        }
        this.preScrollTop = scrollTop
      },

      bottomHandler () {
        if (this.page.hasMore) {
          this.loadMore()
        } else {
          this.addHandler()
        }
      },
      addHandler () {
        const url = '../add/main'
        wx.navigateTo({ url })
      },
      loadMore () {
        list(this.service, this.page).then(res => {
          res.data.list.forEach(item => {
            item['distTime'] = formatTime(item.time)
            item.time = formatDate(item.time)
            this.list.splice(this.list.length, 0, item)
          })
          if (this.page.pageSize * res.data.count > res.data.totalNum) {
            this.page.hasMore = false
            this.bottomText = '没有找到，发布一个 >'
          }
          this.page.pageSize += 1
        })
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
            src: '../../img/gh_e3d8966d446b_258.jpg',
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
              ctx.fillText('分享来自「花生拼车」', self.canvasWidthPx * 0.08, 226)

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
      }
    },
    created () {
      this.getList()
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      const height = clientHeight * rpxR - 90
      this.listHeight = `${height}rpx`
      this.windowHeightPx = clientHeight
      this.windowWidthPx = clientWidth
      this.canvasWidthPx = Math.ceil(clientWidth * 0.9)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "@/styles/card.scss";
  #list {
    @include height-width-100;
    @include column-align-center;
  }
  .nav-main {
    @include height-rpx-width-100(89);
    @include justify-space-between;
    @include border-bottom-width(1);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: $white;
    .nav {
      @include height-width(89, 300);
      display: flex;
      .btn {
        @include height-width-line-height-text-center(85, 100, 100);
        margin-left: 15rpx;
      }
      .active {
        width: 100rpx;
        @include border-bottom(4, $red)
      }
      .tab-hover {
        background: $tabHover;
      }
    }
    .filter {
      @include height-width-text-center(89, 140);
      color: $light-blue;
      font-size: 36rpx;
    }
    .filter-hover {
      background: $tabHover;
      color: $white;
    }
  }

  .list {
    width: 100%;
    margin-top: 90rpx;
    @include justify-center;
    position: relative;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
    .refresh {
      @include height-width-percent-lineHeight-text-center(60, 80);
      position: absolute;
      left: 0;
      top: 0;
      font-size: 32rpx;
      color: $refreshColor;
    }
    .card {
      @include height-rpx-width-percent(360, 96%);
      margin-left: 2%;
    }
    .card:nth-last-child(3) {
      @include border-radius-bottom(0);
      .footer {
        @include border-radius-bottom(0);
      }
    }
    .bottom-block {
      @include height-rpx-width-percent(89, 96%);
      margin-left: 2%;
    }
    .block {
      @include height-rpx-width-100(50)
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
