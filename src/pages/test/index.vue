<template>
  <view>
    <custom-header></custom-header>
    <view id="test">
      <map class="map" show-location></map>
      <button @click="show">打开</button>
    </view>
  </view>

</template>

<script>
  import CustomHeader from '@/components/CustomHeader/index'
  export default {
    data () {
      return {
      }
    },
    components: {
      CustomHeader
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
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading()
      // wx.stopPullDownRefresh()
      // wx.hideNavigationBarLoading()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #test {
    @include height-width-100;
    background: $white;
  }
  .map {
    height: 500rpx;
    width: 100%;
  }


</style>
