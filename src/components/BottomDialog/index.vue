<template>
  <view id="bottom-dialog">
    <view class="modals modals-bottom-dialog" v-if="!hidden">
      <view class="modals-cancel" @click="hideModal"></view>
      <view class="bottom-dialog-body bottom-pos"
            :animation="animationData"
            :style="{ borderTopLeftRadius: topRadius + 'rpx', borderTopRightRadius: topRadius + 'rpx' }">
        <view class="header" v-if="showHeader">
          <view class="cancel">取消</view>
          <view class="confirm">确定</view>
        </view>
        <view class="main">
          <slot></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        animationData: null,
        animation: null,
        hidden: true,
        topRadius: 10,
        showHeader: false
      }
    },
    methods: {
      showModal () {
        this.hidden = false
        this.animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'ease'
        })
        setTimeout(() => {
          this.fadeIn()
        }, 200)
      },
      hideModal () {
        this.animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'ease'
        })
        this.fadeDown()
        setTimeout(() => {
          this.hidden = true
        }, 500)
      },
      fadeIn () {
        this.animation.translateY(0).step()
        this.animationData = this.animation.export()
      },
      fadeDown () {
        this.animation.translateY(300).step()
        this.animationData = this.animation.export()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #bottom-dialog {
  }
  /*模态框*/
  .modals {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .modals-cancel {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
  }
  .bottom-dialog-body {
    position: absolute;
    z-index: 10001;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    .header {
      @include height-rpx-width-100(89);
      @include justify-space-between-align-center;
      color: $light-blue;
      @include border-bottom-width(1);
      .cancel {
        @include height-width-text-center(89, 140);
      }
      .confirm {
        @include height-width-text-center(89, 140);
      }
    }
    .main {
      width: 100%;
    }
  }
  /*动画前初始位置*/
  .bottom-pos {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
</style>