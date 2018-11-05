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
    <view class="list">
    <!--<view class="list">-->

      <view class="card">
        <view class="header">
          <view class="nav-block driver"></view>
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
      <view class="card">
        <view class="header">
          <view class="nav-block driver"></view>
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
      <view class="card">
        <view class="header">
          <view class="nav-block passenger"></view>
          <view class="nav-main">
            <view class="tag">人找车</view>
            <view class="seats">2人</view>
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
              <view class="text">商丘火车站</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月19号（周六） 08:00</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">80</text>
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
    </view>

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
  @import "@/styles/variables.scss";
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
        background: $white;
        .switch {
          @include height-width(75, 300)
          display: flex;
          .btn {
            @include height-width-line-height-text-center(71, 100, 85);
            margin-left: 15rpx;
          }
          .active {
            width: 100rpx;
            @include width-border-bottom(100, 4, $red)
          }
        }
        .my {
          @include height-width-text-center(75, 200);
        }
      }
    }
    .search {
      @include height-rpx-width-100(300);
      @include justify-align-center;
      background: $white;
      .search-main {
        @include height-100-width-percent(94%);
        padding-top: 15rpx;
        .service {
          @include height-rpx-width-100(172);
          @include justify-start-align-center;
          .distance {
            @include height-100-width-percent(88%);
            @include justify-start-align-center;
            .info {
              @include height-percent-width-100(49%);
              @include justify-start-align-center;
              .icon {
                @include height-100-width-percent(12%);
                @include justify-align-center;
              }
              .input {
                @include height-percent-width-percent(99%, 88%);
                @include border-bottom-width(1);
                input {
                  @include height-width-100;
                  padding-left: 12rpx;
                }
              }
            }
          }
          .change {
            @include height-100-width-percent(12%);
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
    .card {
      @include height-rpx-width-100(331);
      @include border-radius-top(10);
      @include border-radius-bottom(10);
      @include justify-align-center;
      margin-top: 10rpx;
      background: $white;
      @include box-shadow;
      .header {
        @include height-rpx-width-100(50);
        display: flex;
        padding-top: 10rpx;
        @include border-radius-top(10);
        background: $cardHeaderBgColor;
        .nav-block {
          @include height-width(35, 10);
          border-radius: 8rpx;
          margin-left: 15rpx;
        }
        .passenger {
          background: $dark-yellow;
        }
        .driver {
          background: $dark-blue;
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
            color: $cardHeaderSummaryColor;
            line-height: 25rpx;
            text-indent: 15rpx;
            margin-top: 5rpx;
            border-left: 4rpx solid $cardHeaderSummaryColor;
          }
        }
      }
      .content {
        @include height-rpx-width-100(200);
        @include justify-start-align-center;
        .left {
          @include height-rpx-width-percent(200, 70%);
          @include justify-align-center;
          .address {
            @include height-rpx-width-100(50);
            @include justify-start-align-center;
            .icon {
              @include height-rpx-width-percent(50, 10%);
              @include justify-align-center;
              .nav {
                @include height-width-text-center(30, 30);
                font-size: 20rpx;
                color: $white;
                border-radius: 50%;
              }
            }
            .text {
              @include height-rpx-width-percent(50, 90%);
              font-size: 32rpx;
              line-height: 60rpx;
              text-indent: 5rpx;
              @include justify-start-align-center;
            }
          }
          .start {
            .icon {
              .nav {
                background: $startColor;
              }
            }
          }
          .road {
            .icon {
              .nav {
                background: $roadColor;
              }
            }
          }
          .end {
            .icon {
              .nav {
                background: $endColor;
              }
            }
          }
          .time {
            .icon {
              .nav {
                background: $timeColor;
              }
            }
          }
          .road {
            .text {
              font-size: 28rpx;
              color: $roadColor;
            }
          }
          .time {
            .text {
              font-size: 28rpx;
              color: $timeColor;
            }
          }
        }
        .right {
          @include height-rpx-width-percent(200, 30%);
          .summary {
            height: 100rpx;
            font-size: 28rpx;
            text-align: right;
            line-height: 40rpx;
            padding-right: 20rpx;
            .price {
              height: 40rpx;
              color: $priceColor;
            }
            .note {
              height: 40rpx;
              color: $unimpColor;
            }
          }
          .share {
            @include height-rpx-width-100(100);
            @include justify-align-center;
            .icon {
              @include height-width-line-height-text-center(50, 80, 47);
              border-radius: 50rpx;
              background: $cardShareColor;
            }
          }

        }
      }
      .footer {
        @include height-rpx-width-100(79);
        @include justify-end;
        padding-top: 10rpx;
        @include border-radius-bottom(10);
        @include border-top-width(1);
        .call-phone {
          height: 50rpx;
          font-size: 32rpx;
          line-height: 50rpx;
          color: $white;
          padding: 0 10rpx;
          margin-right: 15rpx;
          border-radius: 5rpx;
          background: $dark-blue;
        }
      }
    }
  }

</style>
