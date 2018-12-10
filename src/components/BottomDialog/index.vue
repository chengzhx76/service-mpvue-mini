<template>
  <view id="bottom-dialog">
    <view class="modals modals-bottom-dialog" v-if="!hidden" catchtouchmove='true'>
      <view class="modals-cancel" :animation="animationMask" @click="hideModal"></view>
      <view class="bottom-dialog-body bottom-pos"
            :animation="animationModal"
            :style="{ borderTopLeftRadius: topRadius + 'rpx', borderTopRightRadius: topRadius + 'rpx' }">
        <view class="header" v-if="showHeader">
          <view class="cancel" @click="cancel">取消</view>
          <view class="confirm" @click="confirm">确定</view>
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
    props: {
      duration: {
        type: Number,
        default: 400
      },
      showHeader: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        animationModal: null,
        animationMask: null,
        animation: null,
        hidden: true,
        topRadius: 10
      }
    },
    methods: {
      cancel () {
        this.hideModal()
      },
      confirm () {
        this.hideModal()
      },
      showModal () {
        const self = this
        this.showMask()
        this.animation = wx.createAnimation({
          duration: self.duration,
          timingFunction: 'ease'
        })
        setTimeout(() => {
          this.fadeIn()
        }, 200)
      },
      hideModal () {
        const self = this
        this.animation = wx.createAnimation({
          duration: self.duration,
          timingFunction: 'ease'
        })
        this.fadeDown()
        setTimeout(() => {
          this.hideMask()
        }, 300)
      },
      showMask () {
        this.hidden = false
        const animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease'
        })
        animation.opacity(0.3).step()
        this.animationMask = animation.export()
      },
      hideMask () {
        const animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease'
        })
        animation.opacity(0).step()
        this.animationMask = animation.export()
        this.hidden = true
      },
      fadeIn () {
        this.animation.translateY(0).step()
        this.animationModal = this.animation.export()
      },
      fadeDown () {
        this.animation.translateY(300).step()
        this.animationModal = this.animation.export()
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
    background-color: black;
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
