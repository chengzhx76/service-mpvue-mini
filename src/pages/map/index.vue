<template>
  <view id="map">
    <button id="share" open-type="share">转发</button>

    <button @click="testBtn">Test</button>

  </view>

</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      testBtn () {
        let btn = document.getElementById('share')
        btn.click()
      }
    },
    onShareAppMessage (res) {
      console.log(res)
      return {
        title: '快来试试~',
        path: 'pages/index/main'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #map {
    @include height-width-100;
    @include column-align-center;
    background: $white;
  }

</style>
