<template>
  <view id="map">
    <map id="travelMap"
         class="travel-map"
         :subkey="subkey"
         :markers="markers"
         :include-points="markers"
         @tap="bindtap"
         :polyline="polyline"
         show-location
    ></map>
    <view class="switch" hover-class="choose-hover">
      <view class="slider"></view>
    </view>
    <view class="nav-text">
      {{ travel.type === 2 ? '车找人' : '人找车'}}
    </view>
    <view class="service">
      <view class="header">
        <view class="user">
          <view class="avatar">
            <img src="https://wx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM58ZD0kZT40Kd3KuAfGqefkJ5rf8toThR3UqibPib2PoyAKjfgr6nBRCOxeV0TeibC1pAwICdF2paeFg/132"/>
          </view>
          <view class="nickname">
            Cheng
          </view>
        </view>
        <view class="contact" hover-class="btn-hover">
          <view class="icon">
            <text class="fa fa-phone white-icon"/>
          </view>
          <view class="text" @click.stop="phoneCall(travel.mobileNo)">联系TA</view>
        </view>
      </view>
      <view class="content">
        <view class="top">
          <view class="seats" v-if="travel.type === 2">剩余{{ travel.num }}座</view>
          <view class="seats" v-if="travel.type === 1">{{ travel.num }}人乘车</view>
          <view class="price" v-if="travel.price !== '-1'">&yen{{ travel.price }}/人</view>
          <view class="price" v-else>价格面议</view>
        </view>
        <view class="travel">
          <view class="detail">
            <view class="start address">
              <view class="icon">
                <text class="fa fa-car gray-icon"/>
              </view>
              <text class="text">{{ travel.origin }}</text>
            </view>
            <view class="dest address">
              <view class="icon">
                <text class="fa fa-lg fa-map-marker gray-icon"/>
              </view>
              <text class="text">{{ travel.dest }}</text>
            </view>
            <view class="via address" v-if="travel.via">
              <view class="icon">
                <text class="fa fa-lg fa-map-marker gray-icon"/>
              </view>
              <text class="text">{{ travel.via }}</text>
            </view>
            <view class="time address">
              <view class="icon">
                <text class="fa fa-clock-o gray-icon"/>
              </view>
              <text class="text">{{ travel.time }}</text>
            </view>
            <view class="remark address" v-if="travel.remarks">{{ travel.remarks }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="share" hover-class="btn-hover">分享</view>
    </view>
  </view>

</template>

<script>
  // https://lbs.qq.com/qqmap_wx_jssdk/method-direction.html
  // https://blog.csdn.net/tianchengwei09/article/details/79680146
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapKey } from '@/utils/config'
  import { getTravel } from '@/api/api'
  import { formatDate } from '@/utils/index'
  export default {
    data () {
      return {
        subkey: mapKey,
        markers: [],
        polyline: [],
        map: null,
        travel: {
          type: 0,
          origin: '',
          dest: '',
          time: '',
          mobileNo: '',
          num: '',
          price: '',
          via: '',
          remarks: '',
          returnId: ''
        }
      }
    },
    methods: {
      getDetail (id) {
        getTravel(id).then(res => {
          let travel = null
          this.travel = travel = res.data
          this.travel.time = formatDate(travel.time)
          this.markers.push(
            {
              id: 1,
              latitude: parseFloat(travel.originLat),
              longitude: parseFloat(travel.originLng),
              title: travel.origin,
              iconPath: 'origin.png',
              zIndex: 99,
              width: '30px',
              height: '30px'
            },
            {
              id: 2,
              latitude: parseFloat(travel.destLat),
              longitude: parseFloat(travel.destLng),
              title: travel.dest,
              iconPath: 'dest.png',
              zIndex: 99,
              width: '30px',
              height: '30px'
            }
          )
          this.direction(travel)
        })
      },
      phoneCall (phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      bindtap (e) {
      },
      direction (travel) {
        const self = this
        this.map.direction({
          mode: 'driving',
          from: {
            latitude: parseFloat(travel.originLat),
            longitude: parseFloat(travel.originLng)
          },
          to: {
            latitude: parseFloat(travel.destLat),
            longitude: parseFloat(travel.destLng)
          },
          success (res) {
            // 服务异常处理
            if (res.status !== 0) {
              return
            }
            const coors = res.result.routes[0].polyline
            const pl = []
            // 坐标解压（返回的点串坐标，通过前向差分进行压缩）
            const kr = 1000000
            for (let i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
            }
            // 将解压后的坐标放入点串数组pl中
            for (let j = 0; j < coors.length; j += 2) {
              pl.push({
                latitude: coors[j],
                longitude: coors[j + 1]
              })
            }
            // 设置polyline属性，将路线显示出来
            self.polyline = [{
              points: pl,
              color: '#79C89B',
              width: 5
            }]
          }
        })
      }
    },
    mounted () {
      // this.mapCtx = wx.createMapContext('myMap')
      const { id } = this.$root.$mp.query
      if (id) {
        this.getDetail(id)
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
      this.map = new QQMapWX({
        key: mapKey
      })
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #map {
    width: 100%;
    @include justify-align-center;
    background: $white;
  }
  .travel-map {
    @include height-rpx-width-100(500);
  }

  .switch {
    @include height-rpx-width-100(50);
    @include justify-align-center;
    background: $white;
    .slider {
      @include height-width(16, 60);
      @include border-top-bottom-width(5);
    }
  }
  .nav-text {
    @include height-width-percent-text(80, 100%, left);
    padding-left: 20rpx;
    background: $cardHeaderBgColor;
  }
  .service {
    width: 100%;
    @include justify-center;
    .header {
      @include height-rpx-width-percent(119, 96%);
      @include justify-space-between-align-center;
      @include border-bottom-width(1);
      background: $white;
      .user {
        @include height-100-width-rpx(300);
        display: flex;
        .avatar {
          @include height-100-width-rpx(100);
          @include align-center;
          img {
            @include height-width(100, 100);
            @include border-radius-percent(50%);
          }
        }
        .nickname {
          @include height-width-rpx-text-line(60, 200, 80, left);
          padding-left: 15rpx;
          font-size: 32rpx;
          @include over-hidden;
        }
      }
      .contact {
        @include height-width(80, 240);
        @include border-radius(80);
        @include justify-start-align-center;
        margin-right: 20rpx;
        background: $light-blue;
        color: $white;
        .icon {
          @include height-100-width-rpx(79);
          @include border-radius(79);
          @include border-color(1, $white);
          @include justify-align-center;
        }
        .text {
          text-indent: 10rpx;
        }
      }
    }
    .content {
      width: 96%;
      margin-bottom: 150rpx;
      .top {
        @include height-rpx-width-100(100);
        @include justify-space-between-align-center;
        font-weight: bold;
        .seats {
          @include height-line(100, 120);
          color: $unimpColor;
        }
        .price {
          @include height-line(100, 120);
          color: $priceColor;
        }
      }
      .travel {
        width: 100%;
        background: $detailBgColor;
        @include justify-center;
        @include border-radius(10);
        .detail {
          width: 90%;
          margin-top: 30rpx;
          margin-bottom: 30rpx;
          .address {
            min-height: 80rpx;
            width: 100%;
            @include justify-start-align-center;
            .icon {
              min-height: 80rpx;
              width: 15%;
              @include justify-align-center;
            }
            .text {
              min-height: 80rpx;
              width: 85%;
              @include over-hidden;
              font-size: 38rpx;
              line-height: 80rpx;
              text-indent: 5rpx;
            }
          }
          .time {
            .text {
              color: $unimpColor;
            }
          }
          .remark {
            min-height: 90rpx;
            text-indent: 10rpx;
            padding: 6rpx 0;
            margin-top: 10rpx;
            font-size: 34rpx;
            background: #FEF6E3;
            @include border-color(1, #D1CBBF)
            @include border-radius(10);
            color: $unimpColor;
          }
        }
      }
    }
  }
  .footer {
    @include height-rpx-width-100(129);
    position: fixed;
    left: 0;
    bottom: 0;
    @include border-top-width(1);
    z-index: 999;
    @include justify-align-center;
    background: $white;
    .shared {
      @include height-rpx-width-percent(100, 90%);
      line-height: 100rpx;
      text-align: center;
      background: darkseagreen;
    }
    .share {
      @include height-width-percent-text-center(100, 90%);
      background: $gray-blue;
      border-radius: 60rpx;
      font-size: 38rpx;
      color: $white;
    }
  }

</style>
