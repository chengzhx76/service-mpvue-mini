<template>

  <cover-view id="header">
    <cover-view class="left">1</cover-view>
    <cover-view class="center">测试页</cover-view>
    <cover-view class="right">3</cover-view>
  </cover-view>

</template>

<script>
  // "navigationStyle":"custom",
  export default {
    data () {
      return {
      }
    },
    components: {
    },
    methods: {
      show () {
      }
    },
    onLoad () {
    },
    onUnload () {
    },
    created () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #header {
    @include height-rpx-width-100(160);
    @include justify-start-align-center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background: darkgoldenrod;
  }
  .left {
    @include height-100-width-percent(25%);
    background: darkkhaki;
  }
  .center {
    @include height-100-width-percent(50%);
    background: firebrick;
  }
  .right {
    @include height-100-width-percent(25%);
    background: darkseagreen;
  }


</style>
