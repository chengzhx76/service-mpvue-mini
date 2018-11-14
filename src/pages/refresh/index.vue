<template>

  <view id="refresh">
    <view class="fix">======{{ preScrollTop }}=={{ listHeight/2 }}====</view>
      <scroll-view scroll-y class="scroll-view" :style="{height: listHeight + 'rpx'}" @scroll="scroll">
        <view class="refresh" v-if="show">{{ text }}</view>
        <view class="block" :style="{marginTop: marginTop + 'rpx'}"></view>
        <view class="num" v-for="num in 20" :key="num">---{{ num }}----</view>
      </scroll-view>
  </view>

</template>

<script>
  export default {
    data () {
      return {
        listHeight: 370,
        marginTop: 0,
        preScrollTop: 0,
        show: false,
        loading: false,
        text: '下拉加载~~~'
      }
    },
    methods: {
      scroll (e) {
        let scrollTop = e.mp.detail.scrollTop
        // 说明是在下拉
        if (scrollTop < 0 && scrollTop < this.preScrollTop) {
          if (!this.loading) {
            this.loading = true
            this.text = '加载中~~~'
            this.show = true
            this.marginTop = 60
            setTimeout(() => {
              this.loading = false
              this.text = '加载完成~~~'
              setTimeout(() => {
                this.marginTop = 0
                this.show = false
                this.text = '下拉加载~~~'
              }, 200)
            }, 2000)
          }
        }
        this.preScrollTop = scrollTop
      }
    },
    created () {
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      this.listHeight = clientHeight * rpxR - 100
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #refresh {
    @include height-width-100;
    @include column-align-center;
  }
  .fix {
    @include height-rpx-width-100(90);
    background: violet;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    text-align: center;
    line-height: 90rpx;
  }
  .scroll-view {
    width: 100%;
    margin-top: 100rpx;
    position: relative;
    background: darkolivegreen;
    .refresh {
      height: 60rpx;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      line-height: 50rpx;
      background: cadetblue;
    }
    .num {
      height: 100rpx;
      width: 100%;
      line-height: 100rpx;
      text-align: center;
      background: darkkhaki;
    }
  }


</style>
