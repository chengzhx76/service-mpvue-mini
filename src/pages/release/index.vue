<template>
  <view id="release">
    <view class="tip" v-if="hasStaring">进行中</view>
    <view class="list list-start" v-if="hasStaring">
      <view class="travel" v-for="(item, index) in listStart" :key="item.travel.id">
        <movable-area>
          <movable-view out-of-bounds="true"
                        direction="horizontal"
                        :x="item.x"
                        animation="false"
                        damping="100"
                        @change="movableChangeStart(index, $event)"
                        @touchend="touchEndStart(index)"
                        @touchstart="touchStartStart">
            <view class="content" @click="detail(item.travel.id)" hover-class="choose-hover">
              <view class="info">
                <view class="date">
                  <view class="icon">
                    <view class="nav">时</view>
                  </view>
                  <text class="text">{{ item.travel.time }}</text>
                </view>
                <view :class="[item.travel.type === 2 ? 'driver' : 'passenger', 'type']">我是{{ item.travel.type === 2 ? '车主' : '乘客' }}</view>
              </view>
              <view class="origin address">
                <view class="icon">
                  <view class="nav">起</view>
                </view>
                <text class="text">{{ item.travel.origin }}</text>
              </view>
              <view class="dest address">
                <view class="icon">
                  <view class="nav">终</view>
                </view>
                <text class="text">{{ item.travel.dest }}</text>
              </view>
            </view>
          </movable-view>
        </movable-area>
        <view class="delete" @click="deletedStart(item.travel, index)" hover-class="btn-hover">
          <text class="fa fa-3x fa-trash-o"/>
        </view>

      </view>
      <view class="load-more" @click="loadMoreStaring" v-if="pageStaring.hasMore" hover-class="btn-hover">{{ loadingStart }}</view>
    </view>

    <view class="tip" v-if="hasEnd">已结束</view>
    <view class="list list-end" v-if="hasEnd">
      <view class="travel" v-for="(item, index) in listEnd" :key="item.travel.id">
        <movable-area>
          <movable-view out-of-bounds="true"
                        direction="horizontal"
                        :x="item.x"
                        animation="false"
                        damping="100"
                        @change="movableChangeEnd(index, $event)"
                        @touchend="touchEndEnd(index)"
                        @touchstart="touchStartEnd">
            <view class="content" @click="detail(item.travel.id)" hover-class="choose-hover">
              <view :class="[item.travel.type === 2 ? 'driver' : 'passenger', 'type']">{{ item.travel.type === 2 ? '车' : '人' }}</view>
              <view class="origin">{{ item.travel.origin }}</view>
              <view class="conversion-icon">-></view>
              <view class="dest">{{ item.travel.dest }}</view>
              <view class="date">{{ item.travel.time }}</view>
            </view>
          </movable-view>
        </movable-area>
        <view class="delete" @click="deletedEnd(item.travel, index)" hover-class="btn-hover">
          <text class="fa fa-2x fa-trash-o"/>
        </view>
      </view>
      <view class="load-more" @click="loadMoreEnd" v-if="pageEnd.hasMore" hover-class="btn-hover">{{ loadingEnd }}</view>
    </view>

  </view>

</template>

<script>
  // https://www.jianshu.com/p/14ff77fd71cd
  // https://github.com/Ewall1106/miniProgramDemo
  import { getRelease, deleteRelease } from '@/api/api'
  import { formatDate, formatDateTime } from '@/utils/index'
  const now = new Date()
  export default {
    data () {
      return {
        listStart: [],
        listEnd: [],
        pageStaring: {
          pageNum: 1,
          totalNum: 0,
          hasMore: true,
          lastTime: now.getTime()
        },
        pageEnd: {
          pageNum: 1,
          totalNum: 0,
          hasMore: true,
          lastTime: now.getTime()
        },
        endX: 0,
        isTouchStart: true,
        isTouchEnd: true,
        loadingStart: '加载更多~',
        loadingEnd: '加载更多~'
      }
    },
    methods: {
      detail (id) {
        const url = `../detail/main?tid=${id}`
        wx.navigateTo({ url })
      },
      myReleaseStaring () {
        this.getRelease(this.pageStaring.lastTime, 1, this.pageStaring.pageNum, 3)
      },
      myReleaseEnd () {
        this.getRelease(this.pageEnd.lastTime, 2, this.pageEnd.pageNum, 5)
      },
      loadMoreStaring () {
        this.loadingStart = '加载中~'
        this.getRelease(this.pageStaring.lastTime, 1, this.pageStaring.pageNum, 3)
      },
      loadMoreEnd () {
        this.loadingEnd = '加载中~'
        this.getRelease(this.pageEnd.lastTime, 2, this.pageEnd.pageNum, 5)
      },
      getRelease (lastTime, type, pageNum, count) {
        getRelease(lastTime, type, pageNum, count).then(res => {
          this.loadingStart = this.loadingEnd = '加载更多~'
          if (res.meta.code === 2000) {
            res.data.list.forEach(item => {
              if (type === 1) {
                this.pageStaring.lastTime = item.time
                item.time = formatDateTime(item.time)
                this.listStart.push({
                  x: 0,
                  travel: item
                })
              } else {
                this.pageEnd.lastTime = item.time
                item.time = formatDate(item.time)
                this.listEnd.push({
                  x: 0,
                  travel: item
                })
              }
            })
            if (res.data.pageNum * res.data.pageSize >= res.data.totalNum) {
              if (type === 1) {
                this.pageStaring.hasMore = false
              } else {
                this.pageEnd.hasMore = false
              }
            }
          }
        })
      },
      movableChangeStart (index, e) {
        let currentX = e.mp.detail.x
        if (this.isTouchStart) {
          this.listStart[index].x = currentX
        }
        if (currentX === 0 || currentX === -100) {
          this.isTouchStart = true
        }
      },
      touchStartStart (e) {
      },
      touchEndStart (index) {
        this.isTouchStart = false
        if (this.listStart[index].x <= -40) {
          this.listStart[index].x = -100
        } else {
          this.listStart[index].x = 0
        }
      },
      deletedStart (travel, index) {
        this.listStart[index].x = 0
        setTimeout(() => {
          this.listStart.splice(index, 1)
        }, 500)
        deleteRelease(travel.id).then(res => {
          this.listStart.splice(index, 1)
        })
      },
      movableChangeEnd (index, e) {
        let currentX = e.mp.detail.x
        if (this.isTouchEnd) {
          this.listEnd[index].x = currentX
        }
        if (currentX === 0 || currentX === -100) {
          this.isTouchEnd = true
        }
      },
      touchStartEnd (e) {
      },
      touchEndEnd (index) {
        this.isTouchEnd = false
        if (this.listEnd[index].x <= -40) {
          this.listEnd[index].x = -100
        } else {
          this.listEnd[index].x = 0
        }
      },
      deletedEnd (travel, index) {
        this.listEnd[index].x = 0
        setTimeout(() => {
          this.listEnd.splice(index, 1)
        }, 500)
        deleteRelease(travel.id).then(res => {
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
      this.myReleaseStaring()
      this.myReleaseEnd()
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  movable-area {
    width: calc(100% - 200rpx);
    z-index: 999;
    movable-view {
      width: calc(100% + 200rpx);
    }
  }
  .delete {
    width: 200rpx;
    @include justify-align-center;
    .fa {
      color: #FFCCCC;
    }
  }

  #release {
    width: 100%;
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
    margin-bottom: 40rpx;
    .travel {
      width: 96%;
      margin-left: 2%;
      @include justify-align-center;
      .content {
        width: 100%;
        @include justify-align-center;
        @include border-radius(8);
        @include border(1);
        @include box-shadow;
        background: $releaseCellBgColor;
        .driver {
          @include border-color(1, $dark-blue);
        }
        .passenger {
          @include border-color(1, $dark-yellow);
        }
      }
    }
    .load-more {
      @include height-width-percent-lineHeight-text-center(50, 50);
      font-size: 32rpx;
      color: $gray-blue;
      margin-top: 20rpx;
    }
  }
  .list-start {
    .travel {
      height: 200rpx;
      margin-bottom: 35rpx;
      movable-area {
        height: 200rpx;
        movable-view {
          height: 200rpx;
        }
      }
      .delete {
        height: 200rpx;
        line-height: 200rpx;
      }
      .content {
        padding: 10rpx 0;
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
  }
  .list-end {
    .travel {
      @include height-rpx-width-percent(100, 96%);
      margin-bottom: 15rpx;
      movable-area {
        height: 100rpx;
        movable-view {
          height: 100rpx;
        }
      }
      .delete {
        height: 100rpx;
        line-height: 100rpx;
      }
      .content {
      }
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
