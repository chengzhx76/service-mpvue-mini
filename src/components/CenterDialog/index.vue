<template>
    <cover-view class="modal-dialog" v-if="!hidden" @click="hideModal">
      <cover-view class="modal-body">
        <cover-view class="title" v-if="title">{{ title }}</cover-view>
        <cover-view class="main">
          <cover-view class="content">{{ content }}</cover-view>
        </cover-view>
        <cover-view class="footer" v-if="showFooter">
          <cover-view class="btn cancel" hover-class="btn-hover" @click="cancel">{{ cancelText }}</cover-view>
          <cover-view class="btn confirm" hover-class="btn-hover" @click="confirm">{{ confirmText }}</cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        required: true
      },
      showFooter: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      }
    },
    data () {
      return {
        hidden: true,
        isClose: true
      }
    },
    methods: {
      showModal (title, content, isClose) {
        this.hidden = false
        if (title) {
          this.title = title
        }
        if (content) {
          this.content = content
        }
        if (isClose !== null) {
          this.isClose = isClose
        }
      },
      hideModal () {
        if (this.isClose) {
          this.hidden = true
        }
      },
      cancel () {
        this.hideModal()
      },
      confirm () {
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
    background: rgba(0, 0, 0, 0.5);
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
    .main {
      width: 100%;
      @include justify-align-center;
      @include border-top-width(1);
      .content {
        width: 90%;
        margin: 20rpx 8rpx 30rpx 8rpx;
        white-space: normal;
      }
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
