<template>

  <view id="city">
    <view class="select">
      <input placeholder-class="placeholder-color" placeholder="请输入城市名称" />
    </view>
    <view class="list">
      <view class="item"></view>
    </view>
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
  #city {
    @include height-width-100;
    @include column-align-center;
    background: $white;
  }
  .select {
    @include height-rpx-width-100(110);
    @include border-top-width(1);
    @include border-bottom-width(1);
    input {
      @include height-width-100;
      font-size: 36rpx;
      padding-left: 20rpx;
    }
  }

</style>
