<template>

  <view id="draw">

    <view class="info">--{{ windowHeightPx }}--{{ windowWidthPx }}--</view>

    <canvas class="canvas" canvas-id="shareImg" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>

    <view class="btn">
      <button type='primary' @click="drawImg()">画</button>
      <button type='primary' @click="createImg()">生成</button>
    </view>

    <view class='preview'>
      <image :src='src' :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>
      <button type='primary' @click="saveImg()">保存分享图</button>
    </view>

  </view>

</template>

<script>

export default {
  data () {
    return {
      src: '',
      canvasHeightPx: 350,
      canvasWidthPx: 200,
      windowHeightPx: 0,
      windowWidthPx: 0
    }
  },
  methods: {
    drawImg () {
      let self = this
      let bg = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: 'img/bgcz.png',
          success: function (res) {
            console.log(res)
            resolve(res)
          }
        })
      })
      let qr = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: 'img/qr.png',
          success: function (res) {
            console.log(res)
            resolve(res)
          },
          fail: function (error) {
            console.error(error)
          }
        })
      })
      Promise.all([bg, qr]).then(res => {
        console.log(res)
        const ctx = wx.createCanvasContext('shareImg')

        const bgWidth = self.canvasWidthPx
        const bgHeight = self.canvasHeightPx
        const qrWidth = 76
        const qrHeight = 76

        ctx.drawImage('../../' + res[0].path, 0, 0, bgWidth, bgHeight)
        ctx.drawImage('../../' + res[1].path, (bgWidth - qrWidth) / 2, (bgHeight - qrHeight) / 2, qrWidth, qrHeight)

        ctx.setTextAlign('center')
        ctx.setFillStyle('red')
        ctx.setFontSize(18)
        ctx.fillText('分享文字描述1', bgWidth / 2, 130)
        ctx.fillText('分享文字描述2', bgWidth / 2, 160)

        ctx.stroke()
        ctx.draw()
      })
    },
    createImg () {
      let self = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: self.canvasWidthPx,
        height: self.canvasHeightPx,
        destWidth: self.canvasWidthPx,
        destHeight: self.canvasHeightPx,
        canvasId: 'shareImg',
        success: function (res) {
          console.log(res.tempFilePath)
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
            content: '图片已保存到相册，赶紧晒一下吧~',
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
    button {
      margin-top: 20rpx;
      width: 100%;
    }
  }

</style>
