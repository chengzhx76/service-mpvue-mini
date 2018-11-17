<template>

  <view id="draw">

    <view class="info">--{{ windowHeightPx }}--{{ windowWidthPx }}--</view>
    <view class="info">--{{ canvasHeightPx }}--{{ canvasWidthPx }}--</view>

    <canvas class="canvas" canvas-id="shareImg" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>

    <view class="btn">
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

export default {
  data () {
    return {
      src: '',
      canvasHeightPx: 200,
      canvasWidthPx: 200,
      windowHeightPx: 0,
      windowWidthPx: 0
    }
  },
  computed: {
  },
  methods: {
    drawImg () {
      const ctx = wx.createCanvasContext('shareImg')
      ctx.setFillStyle('#F8FCFF')
      ctx.fillRect(0, 0, this.canvasWidthPx, 160)
      ctx.beginPath()
      ctx.setFillStyle('#FFFFFF')
      ctx.fillRect(0, 160, this.canvasWidthPx, 40)

      ctx.beginPath()
      ctx.setLineWidth(1)
      ctx.moveTo(10, 160)
      ctx.lineTo(this.canvasWidthPx - 10, 160)
      ctx.stroke()

      ctx.draw()
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
