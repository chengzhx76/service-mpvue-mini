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
    <view class="switch">
      <view class="slider"></view>
    </view>
    <view class="nav-text">车找人</view>
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
        <view class="contact">

        </view>
      </view>
      <view class="content">

      </view>
    </view>
  </view>

</template>

<script>
  // https://lbs.qq.com/qqmap_wx_jssdk/method-direction.html
  // https://blog.csdn.net/tianchengwei09/article/details/79680146
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapKey } from '@/utils/config'
  import { getTravel } from '@/api/api'
  export default {
    data () {
      return {
        subkey: mapKey,
        markers: [],
        polyline: [],
        map: null
      }
    },
    methods: {
      getDetail (id) {
        getTravel(id).then(res => {
          const travel = res.data
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
    background: darkorange;
    .slider {
      @include height-width(16, 60);
      @include border-top-bottom-width(5);
    }
  }
  .nav-text {
    @include height-width-percent-text(80, 100%, left);
    padding-left: 20rpx;
    background: darkkhaki;
  }
  .service {
    width: 100%;
    @include justify-center;
    background: greenyellow;
    .header {
      @include height-rpx-width-percent(119, 96%);
      @include justify-space-between-align-center;
      @include border-bottom-width(1);
      background: firebrick;
      .user {
        @include height-100-width-rpx(300);
        display: flex;
        background: darkorange;
        .avatar {
          @include height-100-width-rpx(100);
          @include align-center;
          background: darkgrey;
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
          background: bisque;
        }
      }
      .contact {
        @include height-width(80, 180);
        margin-right: 20rpx;
        background: darkgoldenrod;
      }
    }
    .content {
      @include height-rpx-width-percent(400, 96%);
      background: darkgreen;
    }
  }

</style>
