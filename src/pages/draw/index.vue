<template>

  <view id="draw">

    <view class="info">--{{ windowHeight }}--{{ windowWidth }}--</view>

    <canvas class="canvas" canvas-id="shareImg"/>

    <view class="btn">
      <button type='primary' @click="drawImg()">画</button>
      <button type='primary' @click="createImg()">生成</button>
    </view>

    <view class='preview'>
      <image :src='src'/>
      <button type='primary'>保存分享图</button>
    </view>

  </view>

</template>

<script>

export default {
  data () {
    return {
      src: '',
      windowHeight: 0,
      windowWidth: 0
    }
  },
  methods: {
    drawImg () {
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

        ctx.drawImage('../../' + res[0].path, 0, 0, 200, 350)
        ctx.drawImage('../../' + res[1].path, 50, 125, 100, 100)

        ctx.setTextAlign('center')
        ctx.setFillStyle('#ffffff')
        ctx.setFontSize(18)
        ctx.fillText('分享文字描述1', 545 / 2, 130)
        ctx.fillText('分享文字描述2', 545 / 2, 160)

        ctx.stroke()
        ctx.draw()
      })
    },
    createImg () {
      let self = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 545,
        height: 771,
        destWidth: 545,
        destHeight: 771,
        canvasId: 'shareImg',
        success: function (res) {
          console.log(res.tempFilePath)
          self.src = res.tempFilePath
        },
        fail: function (res) {
          console.log(res)
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
    const rpxR = 750 / clientWidth
    this.windowHeight = clientHeight * rpxR
    this.windowWidth = clientWidth * rpxR
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
    background: darkgray;
  }
  .canvas {
    height: 800rpx;
    width: 100%;
    background: darkkhaki;
  }
  .btn {
    height: 300rpx;
    width: 100%;
    background: skyblue;
  }
  .preview {
    width: 100%;
    background: goldenrod;
  }

</style>
