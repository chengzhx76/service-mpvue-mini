<template>
  <view id="center-dialog">
    <view class="modals modals-center-dialog" v-if="!hidden" catchtouchmove='true'>
      <view class="modals-cancel" @click="hideModal"></view>

      <view class="center-dialog-body center-pos">
        <view class="main">
        </view>
      </view>


    </view>
  </view>
</template>

<script>
  export default {
    props: {
    },
    data () {
      return {
        hidden: true
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
  .center-dialog-body {
    position: absolute;
    z-index: 10001;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    .main {
      width: 100%;
    }
  }
</style>
