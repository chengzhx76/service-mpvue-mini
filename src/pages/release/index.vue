<template>
  <view id="release">
    <view class="tip" v-if="hasStaring">进行中</view>
    <view class="list list-start" v-if="hasStaring">
      <view class="travel" @click="detail(travel.id)" v-for="(travel, index) in listStart" :key="travel.id" hover-class="choose-hover">
        <view class="info">
          <view class="date">
            <view class="icon">
              <view class="nav">时</view>
            </view>
            <text class="text">{{ travel.time }}</text>
          </view>
          <view :class="[travel.type === 2 ? 'driver' : 'passenger', 'type']">我是{{ travel.type === 2 ? '车主' : '乘客' }}</view>
        </view>
        <view class="origin address">
          <view class="icon">
            <view class="nav">起</view>
          </view>
          <text class="text">{{ travel.origin }}</text>
        </view>
        <view class="dest address">
          <view class="icon">
            <view class="nav">终</view>
          </view>
          <text class="text">{{ travel.dest }}</text>
        </view>
      </view>
    </view>
    <view class="tip" v-if="hasEnd">已结束</view>
    <view class="list list-end" v-if="hasEnd">
      <view class="travel" @click="detail(travel.id)" v-for="(travel, index) in listEnd" :key="travel.id" hover-class="choose-hover">
        <view :class="[travel.type === 2 ? 'driver' : 'passenger', 'type']">{{ travel.type === 2 ? '车' : '人' }}</view>
        <view class="origin">{{ travel.origin }}</view>
        <view class="conversion-icon">-></view>
        <view class="dest">{{ travel.dest }}</view>
        <view class="date">{{ travel.time }}</view>
      </view>
    </view>
  </view>

</template>

<script>
  import { getRelease } from '@/api/api'
  import { formatDate, formatDateTime } from '@/utils/index'
  const now = new Date()
  export default {
    data () {
      return {
        listStart: [],
        listEnd: [],
        page: {
          pageNum: 1,
          totalNum: 0,
          hasMore: true,
          lastTime: 0
        }
      }
    },
    methods: {
      detail (id) {
        const url = `../detail/main?tid=${id}`
        wx.navigateTo({ url })
      },
      myRelease () {
        getRelease(this.page.lastTime, this.page.pageNum, 5).then(res => {
          if (res.meta.code === 2000) {
            this.list = res.data.list.forEach(item => {
              this.page.lastTime = item.time
              if (now.getTime() > item.time) {
                item.time = formatDate(item.time)
                this.listEnd.push(item)
              } else {
                item.time = formatDateTime(item.time)
                this.listStart.push(item)
              }
            })
            if (res.data.pageNum * res.data.pageSize >= res.data.totalNum) {
              this.page.hasMore = false
            }
          }
        })
      }
    },
    computed: {
      hasStaring () {
        return this.listStart.length > 0
      },
      hasEnd () {
        return this.listEnd.length > 0
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
      this.myRelease()
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
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
    text-indent: 20rpx;
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
      .driver {
        @include border-color(1, $dark-blue);
      }
      .passenger {
        @include border-color(1, $dark-yellow);
      }
    }
  }
  .list-start {
    margin-bottom: 20rpx;
    .travel {
      @include height-rpx-width-percent(200, 96%);
      padding: 15rpx 0;
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
