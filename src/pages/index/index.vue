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
        <view class="nav-main">
          <view class="nav">
            <view v-for="(tab, index) in tabs"
                  :class="[tab.class, {active: tab.isActive}, 'btn']"
                  @click="tabsSwitch(tab.class)"
                  :key="tab.class"
                  hover-class="tab-hover">{{ tab.name }}</view>
          </view>
          <view class="my" hover-class="tab-hover">个人中心</view>
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
                  <input placeholder-class="placeholder-color" placeholder="哪出发" v-model="origin"/>
                </view>
              </view>
              <view class="destination info">
                <view class="icon">
                  <text class="fa fa-lg fa-map-marker gray-icon"/>
                </view>
                <view class="input">
                  <input placeholder-class="placeholder-color" placeholder="要去哪" v-model="dest"/>
                </view>
              </view>
            </view>
            <view class="change">
                <text class="fa fa-1-6x fa-retweet gray-icon"/>
            </view>

          </view>
          <view class="search-btn">
            <button class="search-button" type="default" size="default" @click="searchHandler">搜索顺路车程</button>
          </view>

        </view>
      </view>

    </view>
    <view class="list">

      <view class="card" v-for="(item, index) in list" :key="item.id">
        <view class="header">
          <view :class="[item.type === 2 ? 'driver' : 'passenger', 'nav-block']"></view>
          <view class="nav-info">
            <view class="tag">{{ item.type === 2 ? '车找人' : '人找车'}}</view>
            <view class="seats" v-if="item.type === 2">剩余{{ item.num }}座</view>
            <view class="seats" v-if="item.type === 1">{{ item.num }}人</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">{{ item.origin }}</view>
            </view>
            <view class="road address" v-if="!!item.via">
              <view class="icon">
                <view class="nav">经</view>
              </view>
              <text class="text">{{ item.via }}</text>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">{{ item.dest }}</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">{{ item.time }}</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price" v-if="item.price !== '-1'">
                <text class="money">{{ item.price }}</text>
                <text class="unit">/人</text>
              </view>
              <view class="price" v-else>
                <text class="money">面议</text>
              </view>
              <view class="note">{{ item.distTime }}</view>
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

      <view class="more" hover-class="btn-hover" @click="moreHandler">
        查看更多 >
      </view>

    </view>

    <view class="add" @click="addHandler">
      <text class="fa fa-plus fa-lg"/>
    </view>
  </view>
</template>

<script>
  import { list } from '@/api/api'
  import { formatTime, formatDate } from '@/utils/index'
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
        autoplay: true,
        circular: false,
        interval: 10000,
        duration: 500,
        type: 'all',
        origin: '',
        dest: '',
        list: [],
        tabs: [
          {
            name: '全部',
            class: 'all',
            isActive: true
          },
          {
            name: '乘客',
            class: 'passenger',
            isActive: false
          },
          {
            name: '车主',
            class: 'driver',
            isActive: false
          }
        ]
      }
    },
    components: {
    },
    methods: {
      tabsSwitch (type) {
        this.type = type
        this.getList(type)
        this.tabs.forEach(tab => {
          tab.isActive = type === tab.class
        })
      },
      searchHandler () {
        const url = `../list/main?origin=${this.origin}&dest=${this.dest}`
        wx.navigateTo({ url })
      },

      getList (type) {
        list(type).then(res => {
          this.list = res.data.map(item => {
            item['distTime'] = formatTime(item.time)
            item.time = formatDate(item.time)
            return item
          })
        })
      },

      addHandler () {
        const url = '../add/main'
        wx.navigateTo({ url })
      },
      moreHandler () {
        const url = '../refresh/main'
        wx.navigateTo({ url })
      }
    },
    created () {
      this.getList('all')
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading()
      this.getList(this.type)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "@/styles/card.scss";
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
      .nav-main {
        @include height-rpx-width-100(75);
        @include justify-space-between;
        background: $white;
        .nav {
          @include height-width(75, 300);
          display: flex;
          .btn {
            @include height-width-line-height-text-center(71, 100, 85);
            margin-left: 15rpx;
          }
          .active {
            width: 100rpx;
            @include border-bottom(4, $red)
          }
        }
        .my {
          @include height-width-text-center(75, 200);
        }
        .tab-hover {
          background: $tabHover;
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
    width: 100%;
    min-height: 490rpx;
    margin-bottom: 50rpx;
    @include justify-center;
    .card {
      @include height-rpx-width-percent(360, 98%);
    }
    .more {
      @include height-rpx-width-percent(89, 98%);
      margin-bottom: 50rpx;
    }
  }

  .add {
    @include height-width(90, 90);
    position: fixed;
    right: 40rpx;
    bottom: 50rpx;
    @include justify-align-center;
    @include border-radius(80);
    @include box-shadow;
    background: $endColor;
    text {
      color: $white;
    }
  }
</style>
