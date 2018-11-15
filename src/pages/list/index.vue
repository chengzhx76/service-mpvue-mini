<template>
  <view id="list">
    <view class="nav-main">
      <view class="nav">
        <view v-for="(tab, index) in tabs"
              :class="[tab.class, {active: tab.isActive}, 'btn']"
              @click="tabsSwitch(tab.class)"
              :key="tab.class"
              hover-class="tab-hover">{{ tab.name }}</view>
      </view>
      <view class="filter" hover-class="filter-hover" @click="filterHandler()">筛选</view>
    </view>
    <scroll-view scroll-y class="list" :style="{height: listHeight}" @scroll="scroll">

      <view class="refresh" v-if="show">{{ text }}</view>
      <view :style="{height: blockHeight + 'rpx'}"></view>

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

      <view class="more" hover-class="btn-hover" @click="addHandler">
        没有找到，发布一个 >
      </view>
      <view class="block"></view>
    </scroll-view>
  </view>
</template>

<script>
  import { list } from '@/api/api'
  import { formatTime, formatDate } from '@/utils/index'

  export default {
    components: {
    },

    data () {
      return {
        listHeight: '370rpx',
        type: 'all',
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
        ],
        list: [],
        blockHeight: 0,
        preScrollTop: 0,
        show: false,
        loading: false,
        text: '下拉加载~~~'
      }
    },
    methods: {
      tabsSwitch (type) {
        this.type = type
        this.getList(type)
        this.tabs.forEach(tab => {
          tab.isActive = type === tab.class
        })
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
      filterHandler () {
        const url = '../filter/main'
        wx.navigateTo({ url })
      },
      scroll (e) {
        let scrollTop = e.mp.detail.scrollTop
        // 说明是在下拉
        if (scrollTop < 0 && scrollTop < this.preScrollTop) {
          if (!this.loading) {
            this.loading = true
            this.text = '加载中~~~'
            this.show = true
            this.blockHeight = 60
            setTimeout(() => {
              list(this.type).then(res => {
                this.list = res.data.map(item => {
                  item['distTime'] = formatTime(item.time)
                  item.time = formatDate(item.time)
                  return item
                })
                this.text = '加载完成~~~'
                setTimeout(() => {
                  this.loading = false
                  this.blockHeight = 0
                  this.show = false
                  this.text = '下拉加载~~~'
                }, 1500)
              })
            }, 500)
          }
        }
        this.preScrollTop = scrollTop
      }
    },
    created () {
      this.getList('all')
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      const height = clientHeight * rpxR - 90
      this.listHeight = `${height}rpx`
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "@/styles/card.scss";
  #list {
    @include height-width-100;
    @include column-align-center;
  }
  .nav-main {
    @include height-rpx-width-100(89);
    @include justify-space-between;
    @include border-bottom-width(1);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: $white;
    .nav {
      @include height-width(89, 300);
      display: flex;
      .btn {
        @include height-width-line-height-text-center(85, 100, 100);
        margin-left: 15rpx;
      }
      .active {
        width: 100rpx;
        @include border-bottom(4, $red)
      }
      .tab-hover {
        background: $tabHover;
      }
    }
    .filter {
      @include height-width-text-center(89, 140);
      color: $light-blue;
      font-size: 36rpx;
    }
    .filter-hover {
      background: $tabHover;
      color: $white;
    }
  }

  .list {
    width: 100%;
    margin-top: 90rpx;
    @include justify-center;
    position: relative;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
    .refresh {
      @include height-width-percent-lineHeight-text-center(60, 80);
      position: absolute;
      left: 0;
      top: 0;
      font-size: 32rpx;
      color: $refreshColor;
    }
    .card {
      @include height-rpx-width-percent(360, 96%);
      margin-left: 2%;
    }
    .card:nth-last-child(3) {
      @include border-radius-bottom(0);
      .footer {
        @include border-radius-bottom(0);
      }
    }
    .more {
      @include height-rpx-width-percent(89, 96%);
      margin-left: 2%;
    }
    .block {
      @include height-rpx-width-100(50)
    }
  }


</style>
