<template>

  <view id="draw">
    <!-- 画布大小按需定制 这里我按照背景图的尺寸定的  -->
    <canvas canvas-id="shareImg" style="width:600rpx; height:800rpx"></canvas>

    <!-- 生成分享图 这里的操作是把canvas绘制的图预览出来  -->
    <button class='share' type='primary' @click="drawImg()">画</button>
    <button class='share' type='primary' @click="createImg()">生成</button>

    <!-- 预览分享图 这里就是上图展示的效果   -->
    <!-- 刚开始是隐藏的 生成分享图之后显示, 用一个布尔变量来控制 这里的样式大家看图就写出来了 -->
    <view class='preview'>
      <image :src='src' mode='widthFix'></image>
      <button type='primary' size='mini'>保存分享图</button>
    </view>

  </view>

</template>

<script>

export default {
  data () {
    return {
      src: ''
    }
  },
  methods: {
    drawImg () {
      let promise1 = new Promise(function (resolve, reject) {
        /* 获得要在画布上绘制的图片 */
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
      let promise2 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: 'img/bg.png',
          success: function (res) {
            console.log(res)
            resolve(res)
          }
        })
      })
      /* 图片获取成功才执行后续代码 */
      Promise.all([promise1, promise2]).then(res => {
        console.log(res)
        /* 创建 canvas 画布 */
        const ctx = wx.createCanvasContext('shareImg')

        /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
        /* ps: 网络图片的话 就不用加../../路径了 反正我这里路径得加 */
        ctx.drawImage(res[0].path, 158, 190, 210, 210)
        ctx.drawImage(res[1].path, 0, 0, 545, 771)

        /* 绘制文字 位置自己计算 参数自己看文档 */
        /* 位置 */
        ctx.setTextAlign('center')
        /* 颜色 */
        ctx.setFillStyle('#ffffff')
        /* 字号 */
        ctx.setFontSize(22)
        /* 内容 不会自己处理换行 */
        ctx.fillText('分享文字描述', 545 / 2, 130)
        ctx.fillText('分享文字描述', 545 / 2, 160)

        /* 绘制 */
        ctx.stroke()
        ctx.draw()
      })
    },
    createImg () {
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
          /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
          this.src = res.tempFilePath
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
  created () {
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #test {
    @include height-width-100;
    @include column-align-center;
  }


</style>
