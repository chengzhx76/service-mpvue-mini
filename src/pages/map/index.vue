<template>
  <view id="map">
    <map id="myMap"
        style="width: 100%; height: 300px;"
        :subkey="subkey"
         :markers="markers"
         :include-points="markers"
         @tap="bindtap"
    ></map>

  </view>

</template>

<script>
  // https://lbs.qq.com/qqmap_wx_jssdk/method-direction.html
  export default {
    data () {
      return {
        subkey: 'LT5BZ-BLKW3-MKP3M-YB3AY-IQSWK-GUFLN',
        markers: [
          {
            id: 1,
            latitude: 34.935959,
            longitude: 115.915123,
            title: '成武汽车总站',
            iconPath: './location.png'
          },
          {
            id: 2,
            latitude: 34.86444,
            longitude: 115.95544,
            title: '成武县孙寺镇中心小学',
            iconPath: './location.png'
          }
        ]
      }
    },
    methods: {
      bindtap (e) {
        console.log(e)
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
