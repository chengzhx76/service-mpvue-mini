<template>
  <view id="index">

    <view class="main">
      <view class="section-swiper">
        <swiper class="swiper-main" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
                :vertical="vertical" :interval="interval" :duration="duration">
          <swiper-item class="swiper-item" v-for="item in imgs" :key="item.id">
            <image class="swiper-img" mode="scaleToFill" :src="item.src"/>
          </swiper-item>
        </swiper>
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
                  <input placeholder-class="placeholder-color" placeholder="出发地"/>
                </view>
              </view>
              <view class="destination info">
                <view class="icon">
                  <text class="fa fa-lg fa-map-marker gray-icon"/>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="目的地"/>
                </view>
              </view>
            </view>
            <view class="change">

            </view>

          </view>
          <view class="search-btn">

          </view>

        </view>
      </view>

    </view>
    <view class="add">



    </view>

    <button @click="handler">BTN</button>
    <text class="fa fa-paper-plane-o"></text>
    <text class="fa fa-paper-plane-o" aria-hidden="true"></text>
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
    height: 320rpx;
    width: 100%;
    .section-swiper {
      height: 100%;
      width: 100%;
      margin-bottom: 20rpx;
      .swiper-main {
        height: 100%;
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
    }
    .search {
      height: 300rpx;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background: darkgoldenrod;
      .search-main {
        height: 100%;
        width: 94%;
        background: darkgrey;
        .service {
          height: 180rpx;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          background: darkkhaki;
          .distance {
            height: 100%;
            width: 88%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            background: violet;
            .info {
              height: 90rpx;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: flex-start;
              background: darkcyan;
              .icon {
                height: 100%;
                width: 15%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                background: darkolivegreen;
              }
              .input {
                height: 88rpx;
                width: 85%;
                background: #08e9ef;
                input {
                  height: 100%;
                  width: 100%;
                  padding-left: 12rpx;
                }
              }
            }
            .origin {
              .input {
                border-bottom: 1rpx solid #ed221f;
              }
            }
          }
          .change {
            height: 100%;
            width: 12%;
            background: #5abdab;
          }
        }
      }
    }
  }
</style>
