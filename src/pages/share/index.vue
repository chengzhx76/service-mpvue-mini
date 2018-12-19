<template>

  <view id="share">
    <view style="position: absolute; top: -9999px; left: -9999px;">
      <canvas canvas-id="shareImg" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>
    </view>
    <view class="main">
      <view class="share-img">
        <image :src='src'/>
      </view>
    </view>
    <view class="footer">
      <view class="save" @click="saveShareImg()">保存到手机相册</view>
    </view>
  </view>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { getTravel } from '@/api/api'
  import { fileUrl } from '@/utils/config'
  import { formatDateTime } from '@/utils/index'
  export default {
    data () {
      return {
        src: '',
        canvasHeightPx: 400,
        canvasWidthPx: 500
      }
    },
    methods: {
      createShareImg (val) {
        this.src = ''
        wx.showLoading({
          title: '加载中...'
        })
        this.drawImg(val.type, val.origin, val.dest, val.time, val.qrCode).then(() => {
          setTimeout(() => {
            this.createImg()
            wx.hideLoading()
          }, 500)
        })
      },
      drawImg (type, origin, dest, time, qrCode) {
        const self = this
        let bg = new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: self.shareImg.detail,
            success (res) {
              resolve(res)
            },
            fail (error) {
              wx.hideLoading()
              console.error(error)
            }
          })
        })
        let qr = new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: `${fileUrl}${qrCode}`,
            success (res) {
              resolve(res)
            },
            fail (error) {
              wx.hideLoading()
              console.log('--------->qr')
              console.error(error)
            }
          })
        })
        return new Promise((resolve, reject) => {
          try {
            Promise.all([bg, qr]).then(res => {
              const ctx = wx.createCanvasContext('shareImg')
              // 上部 view
              // ctx.setFillStyle('#F8FCFF')
              // ctx.fillRect(0, 0, self.canvasWidthPx, 170)

              ctx.drawImage(res[0].path, 0, 0, self.canvasWidthPx, 400)

              // 底部view
              // ctx.beginPath()
              // ctx.setFillStyle('#FFFFFF')
              // ctx.fillRect(0, 170, self.canvasWidthPx, 90)

              // 中间的灰线
              // ctx.beginPath()
              // ctx.setStrokeStyle('#E5E5E5')
              // ctx.setLineWidth(1)
              // ctx.moveTo(10, 170)
              // ctx.lineTo(self.canvasWidthPx - 10, 170)
              // ctx.stroke()

              // 头部信息
              ctx.beginPath()
              ctx.setTextAlign('center')
              ctx.setFillStyle('#26548D')
              ctx.setFontSize(28)
              if (type === 1) {
                ctx.fillText('人找车', self.canvasWidthPx * 0.5, 78)
              } else {
                ctx.fillText('车找人', self.canvasWidthPx * 0.5, 78)
              }
              // 行程信息
              ctx.beginPath()
              ctx.setTextAlign('right')
              ctx.setFillStyle('#26548D')
              ctx.setFontSize(26)
              ctx.fillText('起点：', self.canvasWidthPx * 0.26, 140)
              ctx.fillText('终点：', self.canvasWidthPx * 0.26, 180)
              ctx.fillText('时间：', self.canvasWidthPx * 0.26, 220)

              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#0A1519')
              ctx.setFontSize(26)
              ctx.fillText(origin, self.canvasWidthPx * 0.26, 140)
              ctx.fillText(dest, self.canvasWidthPx * 0.26, 180)
              ctx.fillText(formatDateTime(time), self.canvasWidthPx * 0.26, 220)
              // 底部信息
              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#ACACAC')
              ctx.setFontSize(24)
              ctx.fillText('长按识别小程序码，联系TA', self.canvasWidthPx * 0.04, 325)
              ctx.fillText('分享来自「成武拼车」', self.canvasWidthPx * 0.04, 360)

              // 小程序码
              ctx.drawImage(res[1].path, self.canvasWidthPx - 110, 295, 100, 100)
              ctx.draw()
              resolve()
            })
          } catch (error) {
            console.log(error)
            wx.hideLoading()
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
      saveShareImg () {
        const self = this
        wx.saveImageToPhotosAlbum({
          filePath: self.src,
          success (res) {
            wx.showModal({
              content: '图片已保存到相册',
              showCancel: false,
              confirmText: '好的',
              success (res) {
                if (res.confirm) {
                }
              }
            })
          },
          fail (res) {
            console.log(res)
          }
        })
      },
      getTravel (id) {
        getTravel(id).then(res => {
          if (res.meta.code === 2000) {
            this.createShareImg(res.data)
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'shareImg'
      ])
    },
    mounted () {
      const { tid } = this.$root.$mp.query
      if (tid) {
        this.getTravel(tid)
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #share {
    @include height-width-100;
    @include column-align-center;
  }
  .main {
    /*height: calc(100% - 300rpx);*/
    height: 800rpx;
    width: 100%;
    @include justify-align-center;
    .share-img {
      width: 90%;
      height: 90%;
      image {
        @include height-width-100;
        @include border-radius(5);
      }
    }
  }
  .footer {
    @include height-rpx-width-100(129);
    position: fixed;
    left: 0;
    bottom: 0;
    @include border-top-width(1);
    z-index: 999;
    @include justify-align-center;
    background: $white;
    .save {
      @include height-width-percent-text-center(100, 90%);
      background: $gray-blue;
      border-radius: 60rpx;
      font-size: 38rpx;
      color: $white;
    }
  }

</style>
