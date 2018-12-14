<template>

  <view id="release">
    <view class="tip">进行中</view>
    <view class="list-start">
      <view class="travel" hover-class="choose-hover">
        <view class="type car">车</view>
        <view class="origin">菏泽站</view>
        <view class="conversion-icon">-></view>
        <view class="dest">北京</view>
        <view class="date">12月31日</view>
      </view>
    </view>
    <view class="tip">已结束</view>
    <view class="list-end">
      <view class="travel" hover-class="choose-hover">
        <view class="type car">车</view>
        <view class="origin">菏泽站</view>
        <view class="conversion-icon">-></view>
        <view class="dest">北京</view>
        <view class="date">12月31日</view>
      </view>
      <view class="travel" hover-class="choose-hover">
        <view class="type car">车</view>
        <view class="origin">菏泽学院</view>
        <view class="conversion-icon">-></view>
        <view class="dest">孙寺中心小学</view>
        <view class="date">12月01日</view>
      </view>
      <view class="travel" hover-class="choose-hover">
        <view class="type people">人</view>
        <view class="origin">菏泽学院</view>
        <view class="conversion-icon">-></view>
        <view class="dest">孙寺中心小学</view>
        <view class="date">12月01日</view>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #release {
    @include height-width-100;
    @include column-align-center;
  }
  .tip {
    @include height-width-100-text(75, left);
    font-size: 28rpx;
    color: $tipColor;
    padding-left: 20rpx;
  }
  .list-start {
    margin-bottom: 20rpx;
  }
  .list-end, .list-start {
    width: 100%;
    .travel {
      @include height-rpx-width-percent(100, 96%);
      @include justify-start-align-center;
      @include border-radius(8);
      @include border(1);
      @include box-shadow;
      margin-left: 2%;
      margin-bottom: 10rpx;
      background: $releaseCellBgColor;
      .type {
        @include height-width-text-center(40, 40);
        @include border-radius(50);
        margin: 0 10rpx;
        font-size: 30rpx;
        color: $unimpColor;
      }
      .car {
        @include border-color(1, $dark-blue);
      }
      .people {
        @include border-color(1, $dark-yellow);
      }
      .origin {
        @include height-line-center(100);
        width: calc(50% - 145rpx);
        font-size: 34rpx;
        @include over-hidden;
      }
      .conversion-icon {
        width: 50rpx;
      }
      .dest {
        @include height-line-center(100);
        width: calc(50% - 145rpx);
        font-size: 34rpx;
        @include over-hidden;
      }
      .date {
        @include height-width-text-center(100, 174);
        color: $unimpColor;
      }

    }
  }

</style>
