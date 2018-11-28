<template>
  <view id="map">
  </view>

</template>

<script>

  export default {
    data () {
      return {
        map: null
      }
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #city {
    @include height-width-100;
    @include column-align-center;
    background: $white;
  }
  .select {
    @include height-rpx-width-100(98);
    @include border-top-width(1);
    @include border-bottom-width(1);
    input {
      @include height-width-100;
      font-size: 36rpx;
      padding-left: 20rpx;
    }
  }
  .list {
    width: 100%;
    .city {
      @include height-width-percent-text(109, 95%, left);
      @include border-bottom-width(1);
      margin-left: 5%;
    }
  }

</style>
