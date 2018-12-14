<template>
  <view id="my">
    <view class="header">
      <view class="user">

        <view class="avatar">
          <img :src="avatar"/>
        </view>
        <view class="nickname">{{ nickName }}</view>

      </view>

      <view class="setting">
        <button class="wx-setting" open-type="openSetting">
          <text class="fa fa-cog fa-lg gray-icon"/>
        </button>
      </view>
    </view>

    <view class="content">
      <view class="record">
        <view class="left" hover-class="tab-hover"  @click="collect()">
          <view class="warp">
            <view class="num">0</view>
            <view class="desc">我收藏的</view>
          </view>
        </view>
        <view class="right" hover-class="tab-hover" @click="release()">
          <view class="warp">
            <view class="num">12</view>
            <view class="desc">我发布的</view>
          </view>
        </view>
      </view>

      <view class="bar" hover-class="tab-hover">
        <button class="share-btn" open-type="share">
          <view class="icon">
            <text class="fa fa-share-alt fa-lg gray-icon"/>
          </view>
          <text class="text">推荐给朋友</text>
        </button>
      </view>
      <view class="bar" v-if="admin" @click="manger()" hover-class="tab-hover">
        <view class="icon">
          <text class="fa fa-toggle-off fa-lg gray-icon"/>
        </view>
        <text class="text">管理员入口</text>
      </view>

    </view>

  </view>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    methods: {
      collect () {
        wx.showModal({
          content: '功能正在开发中~',
          showCancel: false,
          confirmText: '敬请期待',
          success (res) {
            if (res.confirm) {
            }
          }
        })
      },
      release () {
        const url = '../release/main'
        wx.navigateTo({ url })
      },
      manger () {
        const url = '../admin/main'
        wx.navigateTo({ url })
      }
    },
    computed: {
      ...mapGetters([
        'avatar',
        'nickName',
        'admin',
        'shareImg'
      ])
    },
    onShareAppMessage (res) {
      console.log(res)
      return {
        title: '推荐成武拼车，快来试试~',
        path: 'pages/index/main',
        imageUrl: this.shareImg.index
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
      .wx-setting {
        @include height-width-text-center(80, 120);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        text-decoration: none;
        line-height: 80rpx;
        border-radius: 0;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        background-color: $dark-yellow;
      }
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
        @include height-rpx-width-percent(200, 50%);
        .warp {
          @include height-rpx-width-percent(140, 100%);
          margin-top: 30rpx;
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
      }
      .left {
        .warp {
          @include border-right-width(1);
        }
      }
    }
    .bar {
      @include height-rpx-width-100(110);
      @include justify-start-align-center;
      margin-top: 30rpx;
      position: relative;
      background: $white;
      .share-btn {
        @include height-rpx-width-100(110);
        @include justify-start-align-center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        text-decoration: none;
        line-height: 110rpx;
        border-radius: 0;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        background-color: $white;
      }
      .icon {
        width: 60rpx;
        margin-left: 20rpx;
      }
      .text {
        font-size: 18px;
        color: $titleColor;
      }
      &:after {
        @include arrow(18, 25, 45);
      }
    }
  }

</style>
