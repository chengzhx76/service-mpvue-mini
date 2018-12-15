<template>
  <view id="release">
    <view class="tip">进行中</view>
    <view class="list list-start">
      <view class="travel" hover-class="choose-hover">
        <view class="info">
          <view class="date">
            <view class="icon">
              <view class="nav">时</view>
            </view>
            <text class="text">12月31日（周六） 18:00</text>
          </view>
          <view class="type car">我是车主</view>
        </view>
        <view class="origin address">
          <view class="icon">
            <view class="nav">起</view>
          </view>
          <text class="text">菏泽</text>
        </view>
        <view class="dest address">
          <view class="icon">
            <view class="nav">终</view>
          </view>
          <text class="text">北京</text>
        </view>
      </view>
    </view>
    <view class="tip">已结束</view>
    <view class="list list-end">
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
        listStart: [],
        listEnd: []
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
  .list {
    width: 100%;
    .travel {
      @include border-radius(8);
      @include justify-align-center;
      @include border(1);
      @include box-shadow;
      margin-left: 2%;
      margin-bottom: 10rpx;
      background: $releaseCellBgColor;
      .car {
        @include border-color(1, $dark-blue);
      }
      .people {
        @include border-color(1, $dark-yellow);
      }
    }
  }
  .list-start {
    margin-bottom: 20rpx;
    .travel {
      @include height-rpx-width-percent(200, 96%);
      .info {
        @include height-rpx-width-100(70);
        @include justify-space-between-align-center;
        .type {
          font-size: 30rpx;
          margin-right: 15rpx;
          padding: 5rpx 10rpx;
          @include border-radius(10);
        }
      }
      .address, .date {
        @include justify-start-align-center;
        .icon {
          @include height-width(65, 60);
          @include justify-align-center;
          .nav {
            @include height-width-text-center(30, 30);
            font-size: 20rpx;
            color: $white;
            @include border-radius-percent(50%);
          }
        }
        .text {
          @include height-line(65);
          @include over-hidden;
          font-size: 32rpx;
          text-indent: 5rpx;
        }
      }
      .address {
        @include height-rpx-width-100(65);
      }
      .date {
        height: 70rpx;
        color: $timeColor;
        .icon {
          .nav {
            background: $timeColor;
          }
        }
        .text {
          font-size: 32rpx;
        }
      }
      .origin {
        .icon {
          .nav {
            background: $startColor;
          }
        }
        .text {
          font-size: 34rpx;
        }
      }
      .dest {
        .icon {
          .nav {
            background: $endColor;
          }
        }
        .text {
          font-size: 34rpx;
        }
      }
    }
  }
  .list-end {
    .travel {
      @include height-rpx-width-percent(100, 96%);
      .type {
        @include height-width-text-center(40, 40);
        @include border-radius(50);
        margin: 0 10rpx;
        font-size: 30rpx;
        color: $unimpColor;
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
