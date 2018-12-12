<template>
  <view id="action-sheet">
    <bottom-dialog ref="bottomDialog" :duration="200">
      <view class="sheets">
        <button class="sheet cancel" @click="chooseActionSheet" hover-class="btn-hover">取消</button>
        <button class="sheet" open-type="share" hover-class="btn-hover">分享给朋友</button>
        <button class="sheet" hover-class="btn-hover" @click="shareActionSheet">生成图片分享</button>
      </view>
    </bottom-dialog>
  </view>
</template>

<script>
  import BottomDialog from '@/components/BottomDialog/index'
  export default {
    data () {
      return {
      }
    },
    components: {
      BottomDialog
    },
    methods: {
      showActionSheet () {
        this.$refs.bottomDialog.showModal()
      },
      shareActionSheet () {
        this.$emit('shareImg', true)
        this.chooseActionSheet()
      },
      chooseActionSheet () {
        setTimeout(() => {
          this.$refs.bottomDialog.hideModal()
        }, 50)
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
  #action-sheet {
    width: 100%;
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
