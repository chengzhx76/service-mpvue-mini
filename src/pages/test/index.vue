<template>

  <view id="test">
    <map class="map" show-location></map>
    <center-dialog></center-dialog>
  </view>

</template>

<script>
  import CenterDialog from '@/components/CenterDialog/index'
  export default {
    data () {
      return {
      }
    },
    components: {
      CenterDialog
    },
    methods: {
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
  #test {
    @include height-width-100;
    background: $white;
  }
  .map {
    height: 500rpx;
    width: 100%;
  }


</style>
