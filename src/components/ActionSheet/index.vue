<template>

  <cover-view class="modals" v-if="!hidden">
    <cover-view class="modals-cancel" :animation="animationMask" @click="chooseActionSheet"></cover-view>
    <cover-view class="bottom-dialog-body" :animation="animationModal">
      <cover-view class="sheets">
        <button class="sheet cancel" @click="chooseActionSheet" hover-class="btn-hover">取消</button>
        <button class="sheet" open-type="share" hover-class="btn-hover">分享给微信好友</button>
        <button class="sheet" hover-class="btn-hover" @click="shareActionSheet">生成分享图</button>
      </cover-view>
    </cover-view>
  </cover-view>

</template>

<script>
  export default {
    data () {
      return {
        animationModal: null,
        animationMask: null,
        animation: null,
        hidden: true
      }
    },
    methods: {
      showActionSheet () {
        this.showMask()
        this.animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease'
        })
        setTimeout(() => {
          this.fadeIn()
        }, 200)
      },
      shareActionSheet () {
        this.$emit('shareImg', true)
        this.chooseActionSheet()
      },
      chooseActionSheet () {
        this.animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease'
        })
        this.fadeDown()
        setTimeout(() => {
          this.hideMask()
        }, 300)
        this.$emit('cancel')
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
    },
    onShow () {
      this.chooseActionSheet()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
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
  }

  .sheets {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    background: $shareBg;
    .sheet {
      @include height-rpx-width-100(100);
      @include border-top-width(1);
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-align: center;
      text-decoration: none;
      line-height: 100rpx;
      border-radius: 0;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      font-size: 36rpx;
      background-color: $white;
    }
    .cancel {
      margin-top: 10rpx;
    }
  }
</style>
