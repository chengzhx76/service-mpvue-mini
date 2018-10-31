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
            <view class="passenger btn">乘客</view>
            <view class="driver btn">司机</view>
          </view>
          <view class="my">我的</view>
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
                  <input placeholder-class="placeholder-color" placeholder="从哪出发"/>
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
            <button class="search-button" type="default" size="default" @click="handler">搜索</button>
          </view>

        </view>
      </view>

    </view>
    <view class="add">



    </view>

    <!--<button @click="handler">BTN</button>
    <text class="fa fa-paper-plane-o"></text>
    <text class="fa fa-paper-plane-o" aria-hidden="true"></text>-->
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
        background: darkgoldenrod;
        .switch {
          height: 75rpx;
          width: 240rpx;
          display: flex;
          background: darkslateblue;
          .btn {
            height: 75rpx;
            width: 120rpx;
            text-align: center;
            line-height: 75rpx;
          }
        }
        .my {
          height: 75rpx;
          width: 150rpx;
          text-align: center;
          line-height: 75rpx;
          background: darkgrey;
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
</style>
