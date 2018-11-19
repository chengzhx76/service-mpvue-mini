<template>

  <view id="lbs">
    <button type="default" size="default" @click="testBtn">测试</button>
  </view>

</template>

<script>
  import QQMapWX from '@/libs/qqmap-wx-jssdk'

  export default {
    data () {
      return {
        map: ''
      }
    },
    methods: {
      testBtn () {
        // 调用接口
        this.map.search({
          keyword: '酒店',
          success (res) {
            console.log(res)
            console.log(JSON.stringify(res))
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    },
    created () {
      this.map = new QQMapWX({
        key: 'LT5BZ-BLKW3-MKP3M-YB3AY-IQSWK-GUFLN'
      })
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #lbs {
    @include height-width-100;
    @include column-align-center;
  }


</style>
