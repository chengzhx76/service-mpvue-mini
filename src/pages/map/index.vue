<template>
  <view id="map">
    <map id="myMap"
        style="width: 100%; height: 300px;"
        :subkey="subkey"
         :markers="markers"
         :include-points="markers"
         @tap="bindtap"
         :polyline="polyline"
         show-location
    ></map>
    <button @click="direction">路线规划</button>
  </view>

</template>

<script>
  // https://lbs.qq.com/qqmap_wx_jssdk/method-direction.html
  // https://blog.csdn.net/tianchengwei09/article/details/79680146
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapKey } from '@/utils/config'
  export default {
    data () {
      return {
        subkey: 'LT5BZ-BLKW3-MKP3M-YB3AY-IQSWK-GUFLN',
        markers: [
          {
            id: 1,
            latitude: 34.935959,
            longitude: 115.915123
          },
          {
            id: 2,
            latitude: 34.86444,
            longitude: 115.95544
          }
        ],
        polyline: [],
        map: null
      }
    },
    methods: {
      bindtap (e) {
      },
      direction () {
        const self = this
        this.map.direction({
          mode: 'driving',
          from: {
            latitude: 34.935959,
            longitude: 115.915123
          },
          to: {
            latitude: 34.86444,
            longitude: 115.95544
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
              color: '#3D94FE',
              width: 4
            }]
          },
          fail (res) {
            console.log(res)
          }
        })
      }
    },
    mounted () {
      this.mapCtx = wx.createMapContext('myMap')
      /*
      const self = this
      this.mapCtx.getCenterLocation({
        success (res) {
          console.log(res.longitude)
          console.log(res.latitude)
          self.markers.push({
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: './location.png'
          })
        }
      })
      */
    },
    onLoad () {
      this.map = new QQMapWX({
        key: mapKey
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #map {
    @include height-width-100;
    @include column-align-center;
    background: $white;
  }

</style>
