<template>
  <view id="index">

    <view class="main">
      <view class="section-header">
        <swiper class="swiper-main" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
                :vertical="vertical" :interval="interval" :duration="duration">
          <swiper-item class="swiper-item" v-for="item in imgs" :key="item.id">
            <image class="swiper-img" mode="scaleToFill" :src="item.src"/>
          </swiper-item>
        </swiper>
        <view class="user-main">
          <view class="switch">
            <view class="all btn active">全部</view>
            <view class="passenger btn">乘客</view>
            <view class="driver btn">车主</view>
          </view>
          <view class="my">个人中心</view>
        </view>
      </view>
      <view class="search">
        <view class="search-main">

          <view class="service">
            <view class="distance">
              <view class="origin info">
                <view class="icon">
                  <text class="fa fa-car gray-icon"/>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="哪出发"/>
                </view>
              </view>
              <view class="destination info">
                <view class="icon">
                  <text class="fa fa-lg fa-map-marker gray-icon"/>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="要去哪"/>
                </view>
              </view>
            </view>
            <view class="change">
                <text class="fa fa-1-6x fa-retweet gray-icon"/>
            </view>

          </view>
          <view class="search-btn">
            <button class="search-button" type="default" size="default" @click="handler">搜索顺路车程</button>
          </view>

        </view>
      </view>

    </view>
    <scroll-view class="list" scroll-y>
    <!--<view class="list">-->

      <view class="cart">
        <view class="header">
          <view class="nav-block"></view>
          <view class="nav-main">
            <view class="tag">车找人</view>
            <view class="seats">剩余3位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="road address">
              <view class="icon">
                <view class="nav">经</view>
              </view>
              <text class="text">五岔路口</text>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">菏泽</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月12号（周日） 11:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">12</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">8小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="cart">
        <view class="header">
          <view class="nav-block"></view>
          <view class="nav-main">
            <view class="tag">车找人</view>
            <view class="seats">剩余2位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">济南</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月15号（周一） 08:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">100</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">16小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="cart">
        <view class="header">
          <view class="nav-block"></view>
          <view class="nav-main">
            <view class="tag">车找人</view>
            <view class="seats">剩余2位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">济南</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月15号（周一） 08:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">100</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">16小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script>

export default {
  data () {
    return {
      imgs: [
        {
          id: '1',
          src: 'https://dummyimage.com/240x150/50B347&text=Hello1'
        },
        {
          id: '2',
          src: 'https://dummyimage.com/240x150/4A7BF7&text=Hello2'
        },
        {
          id: '3',
          src: 'https://dummyimage.com/240x150/894FC4&text=Hello3'
        }
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      circular: false,
      interval: 2000,
      duration: 500
    }
  },
  components: {
  },
  methods: {
    handler () {
      const url = '../add/main'
      wx.navigateTo({ url })
    }
  },
  created () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  #index {
    @include height-width-100;
  }
  .main {
    @include height-rpx-width-100(725);
    .section-header {
      @include height-rpx-width-100(405);
      @include justify-align-center;
      margin-bottom: 20rpx;
      .swiper-main {
        @include height-rpx-width-100(330);
        .swiper-item {
          @include height-width-100;
          .swiper-img {
            @include height-width-100;
          }
        }
      }
      .user-main {
        @include height-rpx-width-100(75);
        @include justify-space-between;
        background: #ffffff;
        .switch {
          @include height-width(75, 300)
          display: flex;
          .btn {
            @include height-width-line-height-text-center(71, 100, 85);
            margin-left: 15rpx;
          }
          .active {
            width: 100rpx;
            @include width-border-bottom(100, 4, #fa4d5c)
          }
        }
        .my {
          @include height-width-text-center(75, 200);
          /*background: darkgrey;*/
        }
      }
    }
    .search {
      @include height-rpx-width-100(300);
      @include justify-align-center;
      background: #ffffff;
      .search-main {
        @include height-100-width-percent(94%)
        padding-top: 15rpx;
        .service {
          @include height-rpx-width-100(172);
          @include justify-start-align-center;
          .distance {
            @include height-100-width-percent(88%)
            @include justify-start-align-center;
            .info {
              @include height-percent-width-100(49%)
              @include justify-start-align-center;
              .icon {
                @include height-100-width-percent(15%)
                @include justify-start-align-center;
              }
              .input {
                @include height-percent-width-percent(99%, 85%);
                @include border-bottom-width(1);
                input {
                  @include height-width-100;
                  padding-left: 12rpx;
                }
              }
            }
          }
          .change {
            @include height-100-width-percent(12%)
            @include justify-align-center;
          }
        }
        .search-btn {
          @include height-rpx-width-100(113);
          @include justify-align-center;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .list {
    @include height-rpx-width-100(700);
    @include justify-center;
    .cart {
      @include height-rpx-width-100(331);
      border-radius: 10rpx;
      @include justify-align-center;
      margin-top: 10rpx;
      @include bg-fff;
      @include box-shadow;
      .header {
        @include height-rpx-width-100(50);
        display: flex;
        padding-top: 10rpx;
        @include border-radius-top-left(10);
        background: #FAFAFA;
        .nav-block {
          @include height-width(35, 10)
          border-radius: 8rpx;
          margin-left: 15rpx;
          background: #3B8CDD;
        }
        .nav-main {
          height: 35rpx;
          display: flex;
          .tag {
            height: 35rpx;
            font-size: 30rpx;
            line-height: 36rpx;
            padding-right: 20rpx;
            padding-left: 12rpx;
          }
          .seats {
            height: 25rpx;
            font-size: 24rpx;
            color: #949494;
            line-height: 25rpx;
            text-indent: 15rpx;
            margin-top: 5rpx;
            border-left: 4rpx solid #949494;
          }
        }
      }
      .content {
        height: 200rpx;
        width: 100%;
        @include justify-start-align-center;
        .left {
          height: 200rpx;
          width: 70%;
          @include justify-align-center;
          /*background: #690e0d;*/
          .address {
            height: 50rpx;
            width: 100%;
            @include justify-start-align-center;
            /*background: #fa4d5c;*/
            .icon {
              height: 50rpx;
              width: 10%;
              @include justify-align-center;
              /*background: darkgoldenrod;*/
              .nav {
                height: 30rpx;
                width: 30rpx;
                font-size: 20rpx;
                color: #ffffff;
                line-height: 30rpx;
                border-radius: 50%;
                text-align: center;
                /*background: darkgray;*/
              }
            }
            .text {
              height: 50rpx;
              width: 90%;
              font-size: 32rpx;
              line-height: 60rpx;
              text-indent: 5rpx;
              @include justify-start-align-center;
              /*background: #58b7ff;*/
            }
          }
          .start {
            .icon {
              .nav {
                background: #3D94FE;
              }
            }
          }
          .road {
            .icon {
              .nav {
                background: #DADADA;
              }
            }
          }
          .end {
            .icon {
              .nav {
                background: #C7B685;
              }
            }
          }
          .time {
            .icon {
              .nav {
                background: #989898;
              }
            }
          }
          .road {
            .text {
              font-size: 28rpx;
              color: #DADADA;
            }
          }
          .time {
            .text {
              font-size: 28rpx;
              color: #989898;
            }
          }
        }
        .right {
          height: 200rpx;
          width: 30%;
          .summary {
            height: 100rpx;
            font-size: 28rpx;
            text-align:right;
            line-height: 40rpx;
            padding-right: 20rpx;
            .price {
              height: 40rpx;
            }
            .note {
              height: 40rpx;
            }
          }
          .share {
            height: 100rpx;
            width: 100%;
            @include justify-align-center;
            .icon {
              height: 50rpx;
              width: 80rpx;
              line-height: 47rpx;
              text-align: center;
              border-radius: 50rpx;
              background: #F0F0F0;
            }
          }

        }
      }
      .footer {
        height: 79rpx;
        width: 100%;
        display: flex;
        padding-top: 10rpx;
        justify-content: flex-end;
        border-bottom-left-radius: 10rpx;
        border-bottom-right-radius: 10rpx;
        border-top: 1rpx solid #EDEDED;
        .call-phone {
          height: 50rpx;
          font-size: 32rpx;
          line-height: 50rpx;
          padding: 0 10rpx;
          margin-right: 15rpx;
          border-radius: 5rpx;
          background: #bdb76b;
        }
      }
    }
  }


</style>
