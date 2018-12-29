<template>
    <cover-view class="modal-dialog" v-if="!hidden">
      <cover-view class="modal-body">
        <cover-view class="title">{{ title }}</cover-view>
        <cover-view class="content">
          {{ content }}
        </cover-view>
        <cover-view class="footer">
          <cover-view class="btn cancel" hover-class="btn-hover">{{ cancelText }}</cover-view>
          <cover-view class="btn confirm" hover-class="btn-hover">{{ confirmText }}</cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
</template>

<script>
  export default {
    props: {
    },
    data () {
      return {
        hidden: false,
        title: '提示',
        content: '内容',
        cancelText: '取消',
        confirmText: '确定'
      }
    },
    methods: {
      cancel () {
      },
      confirm () {
      },
      showModal () {
      },
      hideModal () {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .modal-dialog {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:rgba(0, 0, 0, 0.5);
    @include justify-align-center;
  }
  .modal-body {
    width: 75%;
    background: $white;
    @include border-radius(6);
    .title {
      @include height-width-percent-text-center(80);
      font-size: 36rpx;
    }
    .content {
      height: 200rpx;
      width: 100%;
      @include border-top-width(1);
    }
    .footer {
      width: 100%;
      @include justify-space-between-align-center;
      @include border-top-width(1);
      background: $borderColor;
      .cancel {
        width: calc(50% - 1rpx);
        border-bottom-left-radius: 6rpx;
      }
      .confirm {
        width: 50%;
        border-bottom-right-radius: 6rpx;
      }
    }
    .btn {
      @include height-line-center(80);
      font-size: 38rpx;
      background: $white;
    }
  }
</style>
