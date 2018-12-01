<template>
  <view id="my">
    <view class="header">
      <view class="user">

        <view class="avatar">
          <img :src="avatar"/>
        </view>
        <view class="nickname">{{ nickname }}</view>

      </view>

      <view class="setting">
        <text class="fa fa-cog fa-lg gray-icon"/>
      </view>
    </view>

    <view class="content">
      <view class="record">
        <view class="left" hover-class="tab-hover">
          <view class="num">6</view>
          <view class="desc">我约到的</view>
        </view>
        <view class="line"></view>
        <view class="right" hover-class="tab-hover">
          <view class="num">12</view>
          <view class="desc">我发布的</view>
        </view>
      </view>

      <view class="bar" hover-class="tab-hover">
        <view class="icon">
          <text class="fa fa-share-alt fa-lg gray-icon"/>
        </view>
        <text class="text">推荐给朋友</text>
      </view>
      <view class="bar" hover-class="tab-hover">
        <view class="icon">
          <text class="fa fa-toggle-off fa-lg gray-icon"/>
        </view>
        <text class="text">管理员入口</text>
      </view>

    </view>

  </view>

</template>

<script>
  export default {
    data () {
      return {
        avatar: 'http://himg.bdimg.com/sys/portrait/item/71596368656e677a68783736ff02.jpg',
        nickname: 'Cheng'
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
  #my {
    @include height-width-100;
  }
  .header {
    @include height-rpx-width-100(260);
    @include justify-space-between;
    background: $dark-yellow;
    .user {
      @include height-100-width-percent(50%);
      display: flex;
      padding-left: 30rpx;
      .avatar {
        @include height-100-width-rpx(150);
        @include align-center;
        img {
          @include height-width(150, 150);
          @include border-radius(75);
        }
      }
      .nickname {
        @include height-width(260, 180);
        @include over-hidden;
        font-size: 42rpx;
        color: $titleColor;
        line-height: 180rpx;
        margin-left: 18rpx;
      }
    }
    .setting {
      @include height-width-text-center(80, 120);
      color: $unimpColor;
    }
  }
  .content {
    width: 100%;
    height: 500rpx;
    margin-top: 30rpx;
    .record {
      @include height-rpx-width-100(200);
      @include justify-start-align-center;
      background: $white;
      .left, .right {
        @include height-rpx-width-percent(140, 49%);
        .num {
          @include height-width-percent-text-center(80);
          font-size: 50rpx;
          color: $unimpColor;
        }
        .desc {
          @include height-width-percent-text-center(60);
          font-size: 36rpx;
          color: $tipColor;
        }
      }
      .line {
        @include height-rpx-width-percent(150, 1%);
        @include border-left-width(1);
      }
    }
    .bar {
      @include height-rpx-width-100(110);
      @include justify-start-align-center;
      margin-top: 30rpx;
      position: relative;
      background: $white;
      .icon {
        width: 60rpx;
        margin-left: 20rpx;
      }
      .text {
        color: $titleColor;
      }
      &:after {
        @include arrow(18, 25, 45);
      }
    }
  }

</style>
