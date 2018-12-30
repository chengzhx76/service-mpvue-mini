<template>
  <view id="share-img">
    <view style="position: absolute; top: -9999px; left: -9999px;">
      <canvas canvas-id="shareImg" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>
    </view>
    <view class='share-preview' v-if="showShareImg" @click="closeShareImgMode()" catchtouchmove='true'>
      <view class="share-warp">
        <view class="share-img">
          <image :src='src'/>
        </view>
        <view class="save-img-btn" @click="saveShareImg()">保存图片</view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { fileUrl } from '@/utils/config'
  export default {
    props: {
    },
    data () {
      return {
        showShareImg: false,
        showImg: true,
        src: '',
        canvasHeightPx: 400,
        canvasWidthPx: 500
      }
    },
    computed: {
      ...mapGetters([
        'uid',
        'shareImg'
      ])
    },
    methods: {
      // showImg 是否是后台生成图片 true-不是
      createShareImg (val, showImg) {
        if (showImg !== null && showImg !== undefined) {
          this.showImg = showImg
        }
        if (this.showImg) {
          this.src = ''
          wx.showLoading({
            title: '加载中...'
          })
          this.showShareImg = true
        }
        this.drawImg(val.type, val.origin, val.dest, val.time, val.mobileNo, val.qrCode).then(() => {
          setTimeout(() => {
            this.createImg()
            if (this.showImg) {
              wx.hideLoading()
            }
          }, 500)
        })
      },
      drawImg (type, origin, dest, time, mobileNo, qrCode) {
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
              /*
              if (self.showImg) {
                ctx.drawImage(res[0].path, 0, 0, self.canvasWidthPx, 170)
                // 底部view
                ctx.beginPath()
                ctx.setFillStyle('#FFFFFF')
                ctx.fillRect(0, 170, self.canvasWidthPx, 90)
              } else {
                ctx.drawImage(res[0].path, 0, 0, self.canvasWidthPx, 260)
              }
              */
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
              ctx.fillText('起点：', self.canvasWidthPx * 0.25, 140)
              ctx.fillText('终点：', self.canvasWidthPx * 0.25, 180)
              ctx.fillText('时间：', self.canvasWidthPx * 0.25, 220)

              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#0A1519')
              ctx.setFontSize(26)
              ctx.fillText(origin, self.canvasWidthPx * 0.25, 140)
              ctx.fillText(dest, self.canvasWidthPx * 0.25, 180)
              ctx.fillText(time, self.canvasWidthPx * 0.25, 220)
              if (self.showImg) {
                // 底部信息
                ctx.beginPath()
                ctx.setTextAlign('left')
                ctx.setFillStyle('#ACACAC')
                ctx.setFontSize(24)
                ctx.fillText('长按识别小程序码，联系TA', self.canvasWidthPx * 0.04, 325)
                ctx.fillText('分享来自「成武拼车」', self.canvasWidthPx * 0.04, 360)

                // 小程序码
                ctx.drawImage(res[1].path, self.canvasWidthPx - 110, 295, 100, 100)
              } else {
                ctx.beginPath()
                ctx.setTextAlign('center')
                ctx.setFillStyle('#990f34')
                ctx.setFontSize(40)
                ctx.fillText('快来联系我吧~', self.canvasWidthPx * 0.5, 370)
              }
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
            if (self.showImg) {
              self.src = res.tempFilePath
            } else {
              self.$emit('shareImgUrl', res.tempFilePath)
            }
          },
          fail (res) {
            console.log(res)
          }
        })
      },
      closeShareImgMode () {
        this.showShareImg = false
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
              success (res) {
                if (res.confirm) {
                }
              }
            })
          }
        })
      }
    },
    mounted () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #share-img {
    @include height-width-100;
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
      height: 700rpx;
      width: 90%;
      @include column-align-center;
      .share-img {
        @include height-width-100;
        image {
          @include height-width-100;
          @include border-radius(5);
        }
      }
      .save-img-btn {
        @include height-width-text-center(80, 240);
        @include border-radius(30);
        margin-top: 50rpx;
        color: #446C9D;
        font-size: 32rpx;
        background: #ffffff;
      }
    }
  }
</style>
