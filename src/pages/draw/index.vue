<template>

  <view id="draw">

    <view class="info">--窗口高：{{ windowHeightPx }}--窗口宽：{{ windowWidthPx }}--</view>
    <view class="info">--画布高：{{ canvasHeightPx }}--画布宽：{{ canvasWidthPx }}--</view>

    <canvas class="canvas" canvas-id="shareImg" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>

    <view class="btn">
      <button type='primary' @click="createShareImg()">创建并生成</button>
      <button type='primary' @click="drawImg()">画</button>
      <button type='primary' @click="createImg()">生成</button>
      <button type='primary' @click="saveImg()">保存</button>
    </view>

    <view class='preview'>
      <image :src='src' :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>
    </view>

  </view>

</template>

<script>
  import { formatDate } from '@/utils/index'

  export default {
    data () {
      return {
        src: '',
        canvasHeightPx: 260,
        canvasWidthPx: 200,
        windowHeightPx: 0,
        windowWidthPx: 0
      }
    },
    computed: {
    },
    methods: {

      createShareImg () {
        this.drawImg(1, '成武', '菏泽', 1542516100000).then(() => {
          this.createImg()
        })
      },

      drawImg (type, origin, dest, time) {
        const self = this
        let qr = new Promise(function (resolve, reject) {
          wx.getImageInfo({
            src: 'img/gh_e3d8966d446b_258.jpg',
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
              ctx.fillText(formatDate(time), self.canvasWidthPx * 0.25, 130)

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
      },
      saveImg () {
        const self = this
        wx.saveImageToPhotosAlbum({
          filePath: self.src,
          success (res) {
            console.log(res)
            wx.showModal({
              content: '图片已保存到相册',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        })
      }
    },
    created () {
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
  #draw {
    @include height-width-100;
    @include justify-center;
  }
  .info {
    height: 60rpx;
    width: 100%;
    text-align: center;
    line-height: 60rpx;
    margin-bottom: 20rpx;
    background: darkgray;
  }
  .canvas {
    background: darkkhaki;
  }
  .btn {
    width: 100%;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    background: skyblue;
  }
  .preview {
    width: 100%;
    @include justify-center;
    image {
      background: khaki;
    }
  }

</style>
