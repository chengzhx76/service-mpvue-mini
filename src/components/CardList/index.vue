<template>
  <view id="card">
    <view class="card" @click="detail(travel.id)" v-for="(travel, index) in travels" :key="travel.id" hover-class="choose-hover">
      <view class="header">
        <view :class="[travel.type === 2 ? 'driver' : 'passenger', 'nav-block']"></view>
        <view class="nav-info">
          <view class="tag">{{ travel.type === 2 ? '车找人' : '人找车'}}</view>
          <view class="seats" v-if="travel.type === 2">剩余{{ travel.num }}座</view>
          <view class="seats" v-if="travel.type === 1">{{ travel.num }}人</view>
        </view>
      </view>
      <view class="content">
        <view class="left">
          <view class="start address">
            <view class="icon">
              <view class="nav">起</view>
            </view>
            <text class="text">{{ travel.origin }}</text>
          </view>
          <view class="road address" v-if="!!travel.via">
            <view class="icon">
              <view class="nav">经</view>
            </view>
            <text class="text">{{ travel.via }}</text>
          </view>
          <view class="end address">
            <view class="icon">
              <view class="nav">终</view>
            </view>
            <text class="text">{{ travel.dest }}</text>
          </view>
          <view class="time address">
            <view class="icon">
              <view class="nav">时</view>
            </view>
            <text class="text">{{ travel.time }}</text>
          </view>
        </view>
        <view class="right">
          <view class="summary">
            <view class="price" v-if="travel.price !== '-1'">
              <text class="money">{{ travel.price }}</text>
              <text class="unit">/人</text>
            </view>
            <view class="price" v-else>
              <text class="money">面议</text>
            </view>
            <view class="note">{{ travel.distTime }}</view>
          </view>
          <view class="share">
            <view class="icon" hover-class="btn-hover" @click.stop="chooseShare(travel)">
              <text class="fa blue-icon fa-sm fa-share-alt"/>
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <button class="call-phone" size="mini" hover-class="btn-hover" @click.stop="phoneCall(travel.mobileNo)">联系TA</button>
      </view>
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
    <action-sheet ref="actionSheet" @shareImg="createShareImg"></action-sheet>
  </view>
</template>

<script>
  import ActionSheet from '@/components/ActionSheet/index'
  export default {
    props: {
      travels: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data () {
      return {
        showShareImg: false,
        src: '',
        canvasHeightPx: 260,
        canvasWidthPx: 200,
        windowHeightPx: 0,
        windowWidthPx: 0,
        tempTravel: null
      }
    },
    components: {
      ActionSheet
    },
    methods: {
      detail (id) {
        const url = `../detail/main?id=${id}`
        wx.navigateTo({ url })
      },
      phoneCall (phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      chooseShare (item) {
        this.tempTravel = item
        this.$refs.actionSheet.showActionSheet()
        /*
        const self = this
        wx.showActionSheet({
          itemList: ['生成图片 保存分享'],
          success (res) {
            if (res.tapIndex === 0) {
              self.createShareImg(item)
            }
          }
        })
        */
      },
      createShareImg () {
        let val = this.tempTravel
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
            self.tempTravel = null
            self.showShareImg = false
            wx.showModal({
              content: '图片已保存到相册',
              showCancel: false,
              confirmText: '好的',
              success (res) {
                if (res.confirm) {
                }
              }
            })
          }
        })
      },
      drawImg (type, origin, dest, time) {
        const self = this
        let qr = new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: '../../img/gh_a53167bbfa26_258.jpg',
            success (res) {
              resolve(res)
            },
            fail (error) {
              console.error(error)
            }
          })
        })

        return new Promise((resolve, reject) => {
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
          success (res) {
            self.src = res.tempFilePath
          },
          fail (res) {
            console.log(res)
          }
        })
      },
      closeShareImgMode () {
        this.tempTravel = null
        this.showShareImg = false
      }
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      this.windowHeightPx = clientHeight
      this.windowWidthPx = clientWidth
      this.canvasWidthPx = Math.ceil(clientWidth * 0.9)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #card {
    width: 100%;
  }
  .card {
    width: 98%;
    height: 360rpx;
    margin-left: 1%;
    @include border-radius-top(10);
    @include border-radius-bottom(10);
    @include justify-align-center;
    margin-top: 15rpx;
    background: $white;
    @include box-shadow;
    &:nth-last-child(2) {
      @include border-radius-bottom(0);
      .footer {
        @include border-radius-bottom(0);
      }
    }
    .header {
      @include height-rpx-width-100(60);
      display: flex;
      @include border-radius-top(10);
      background: $cardHeaderBgColor;
      .nav-block {
        @include height-width(35, 10);
        @include border-radius(8);
        margin-top: 15rpx;
        margin-left: 15rpx;
      }
      .passenger {
        background: $dark-yellow;
      }
      .driver {
        background: $dark-blue;
      }
      .nav-info {
        margin-top: 15rpx;
        height: 35rpx;
        display: flex;
        .tag {
          height: 35rpx;
          font-size: 30rpx;
          line-height: 36rpx;
          padding-right: 20rpx;
          padding-left: 12rpx;
        }
        .seats {
          height: 25rpx;
          font-size: 24rpx;
          color: $cardHeaderSummaryColor;
          line-height: 25rpx;
          text-indent: 15rpx;
          margin-top: 5rpx;
          border-left: 4rpx solid $cardHeaderSummaryColor;
        }
      }
    }
    .content {
      @include height-rpx-width-100(230);
      @include justify-start-align-center;
      .left {
        @include height-rpx-width-percent(230, 72%);
        @include justify-align-center;
        .address {
          @include height-rpx-width-100(65);
          @include justify-start-align-center;
          .icon {
            @include height-rpx-width-percent(65, 10%);
            @include justify-align-center;
            .nav {
              @include height-width-text-center(30, 30);
              font-size: 20rpx;
              color: $white;
              @include border-radius-percent(50%);
            }
          }
          .text {
            @include height-rpx-width-percent(65, 90%);
            @include over-hidden;
            font-size: 32rpx;
            line-height: 60rpx;
            text-indent: 5rpx;
          }
        }
        .start {
          .icon {
            .nav {
              background: $startColor;
            }
          }
          .text {
            font-size: 36rpx;
          }
        }
        .road {
          height: 50rpx;
          .icon {
            .nav {
              background: $roadColor;
            }
          }
          .text {
            color: $roadColor;
            font-size: 28rpx;
          }
        }
        .end {
          .icon {
            .nav {
              background: $endColor;
            }
          }
          .text {
            font-size: 36rpx;
          }
        }
        .time {
          height: 50rpx;
          color: $timeColor;
          .icon {
            .nav {
              background: $timeColor;
            }
          }
          .text {
            font-size: 28rpx;
          }
        }
      }
      .right {
        @include height-rpx-width-percent(230, 28%);
        .summary {
          height: 100rpx;
          font-size: 28rpx;
          padding-right: 20rpx;
          .price {
            @include height-text(40, right);
            color: $priceColor;
            .money {
              font-size: 34rpx;
            }
          }
          .note {
            @include height-text(40, right);
            color: $unimpColor;
          }
        }
        .share {
          @include height-rpx-width-100(130);
          @include justify-align-center;
          .icon {
            @include height-width-line-height-text-center(50, 80, 47);
            @include border-radius(50);
            background: $cardShareColor;
          }
        }

      }
    }
    .footer {
      @include height-rpx-width-100(70);
      @include justify-end;
      padding-top: 10rpx;
      @include border-radius-bottom(10);
      @include border-top-width(1);
      .call-phone {
        height: 50rpx;
        font-size: 32rpx;
        line-height: 50rpx;
        color: $cardBtnFontColor;
        padding: 0 15rpx;
        margin-right: 15rpx;
      }
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
      @include column-align-center;
      .share-img {
        image {
          @include height-width-100;
          @include border-radius(5);
        }
      }
      .save-img-btn {
        @include height-width-text-center(80, 240)
        @include border-radius(30);
        margin-top: 50rpx;
        color: #446C9D;
        font-size: 32rpx;
        background: #ffffff;
      }
    }
  }
</style>
