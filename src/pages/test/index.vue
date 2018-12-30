<template>

  <view id="test">
    <map class="map" show-location></map>
    <center-dialog ref="centerDialog" title="提示" :content="content"/>
    <button @click="show">打开</button>
  </view>

</template>

<script>
  import CenterDialog from '@/components/CenterDialog/index'
  export default {
    data () {
      return {
        content: '数字媒体、摄影、音乐、文学等众多艺术门类于一身的艺术表现形式'
      }
    },
    components: {
      CenterDialog
    },
    methods: {
      show () {
        this.$refs.centerDialog.showModal()
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
  #test {
    @include height-width-100;
    background: $white;
  }
  .map {
    height: 500rpx;
    width: 100%;
  }


</style>
