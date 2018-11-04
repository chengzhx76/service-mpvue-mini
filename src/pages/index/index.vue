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
  #index {
    width: 100%;
    height: 100%;
  }
  .main {
    height: 725rpx;
    width: 100%;
    .section-header {
      height: 405rpx;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      .swiper-main {
        height: 330rpx;
        width: 100%;
        .swiper-item {
          height: 100%;
          width: 100%;
          .swiper-img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .user-main {
        height: 75rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        .switch {
          height: 75rpx;
          width: 300rpx;
          display: flex;
          /*background: darkslateblue;*/
          .btn {
            height: 71rpx;
            width: 100rpx;
            text-align: center;
            line-height: 85rpx;
            margin-left: 15rpx;
          }
          .active {
            width: 100rpx;
            border-bottom: 4rpx solid #fa4d5c;
          }
        }
        .my {
          height: 75rpx;
          width: 200rpx;
          text-align: center;
          line-height: 75rpx;
          /*background: darkgrey;*/
        }
      }
    }
    .search {
      height: 300rpx;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      .search-main {
        height: 100%;
        width: 94%;
        padding-top: 15rpx;
        .service {
          height: 172rpx;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          .distance {
            height: 100%;
            width: 88%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            .info {
              height: 49%;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: flex-start;
              .icon {
                height: 100%;
                width: 15%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
              }
              .input {
                height: 99%;
                width: 85%;
                border-bottom: 1rpx solid #EDEDED;
                input {
                  height: 100%;
                  width: 100%;
                  padding-left: 12rpx;
                }
              }
            }
          }
          .change {
            height: 100%;
            width: 12%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
        }
        .search-btn {
          height: 113rpx;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
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
    height: 700rpx;
    width: 100%;
    /*margin-top: 20rpx;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /*background: darkkhaki;*/
    .cart {
      height: 331rpx;
      width: 100%;
      border-radius: 10rpx;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-top: 10rpx;
      background: #ffffff;
      box-shadow:1rpx 1rpx 5px #E6E6E6;
      .header {
        height: 50rpx;
        width: 100%;
        display: flex;
        padding-top: 10rpx;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        background: #FAFAFA;
        .nav-block {
          height: 35rpx;
          width: 10rpx;
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
            padding-right: 10px;
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
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        .left {
          height: 200rpx;
          width: 70%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          /*background: #690e0d;*/
          .address {
            height: 50rpx;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            /*background: #fa4d5c;*/
            .icon {
              height: 50rpx;
              width: 10%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
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
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: flex-start;
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
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
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
