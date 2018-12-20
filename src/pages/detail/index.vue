<template>
  <view id="map">
    <map id="travelMap"
         class="travel-map"
         :style="{ height: mapHeight + 'rpx' }"
         :subkey="subkey"
         :markers="markers"
         :include-points="markers"
         @tap="bindtap"
         :polyline="polyline"
         show-location
    ></map>
    <view class="nav">
      <view class="left">{{ travel.type === 2 ? '车找人' : '人找车'}}</view>
      <view class="switch" @click="mapSwitch">
        <view class="slider"></view>
      </view>
      <view class="right">
        <view class="modify" v-if="travel.uid === uid" @click="modify(travel.id)" hover-class="tab-hover">修改</view>
      </view>
    </view>

    <view class="service">
      <view class="header">
        <view class="user">
          <view class="avatar">
            <img :src="avatar"/>
          </view>
          <view class="nickname">{{ nickName }}</view>
        </view>
        <view class="contact" @click.stop="phoneCall(travel.mobileNo)" hover-class="btn-hover">
          <view class="icon">
            <text class="fa fa-phone white-icon"/>
          </view>
          <view class="text">联系TA</view>
        </view>
      </view>
      <view class="content" v-if="!bigMap">
        <view class="top">
          <view class="left">
            <view class="seats" v-if="travel.type === 1">{{ travel.num }}人乘车</view>
            <view class="seats" v-else>剩余{{ travel.num }}座</view>
            <view class="price" v-if="travel.price !== '-1'">&yen{{ travel.price }}/人</view>
            <view class="price" v-else>价格面议</view>
          </view>
          <view class="right" hover-class="btn-hover">
            <view class="return" v-if="travel.returnId !== ''" @click="returnDetail(travel.returnId)">原</view>
            <view class="return" v-else-if="travel.initialId !== ''" @click="travelDetail(travel.initialId)">返</view>
          </view>
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
                <text class="fa fa-sm fa-level-up gray-icon"/>
              </view>
              <text class="text">{{ travel.via }}</text>
            </view>
            <view class="time address">
              <view class="icon">
                <text class="fa fa-clock-o gray-icon"/>
              </view>
              <text class="text">{{ travel.time }}</text>
            </view>
            <view class="remark address" v-if="travel.remarks">备注：{{ travel.remarks }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="share" @click="share" hover-class="btn-hover">分享</view>
    </view>
    <action-sheet ref="actionSheet" @shareImg="createShareImg"></action-sheet>
    <share-img ref="shareImgCom" @shareImgUrl="getShareImgUrl"></share-img>
  </view>

</template>

<script>
  // https://lbs.qq.com/qqmap_wx_jssdk/method-direction.html
  // https://blog.csdn.net/tianchengwei09/article/details/79680146
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapGetters } from 'vuex'
  import { mapKey } from '@/utils/config'
  import { getTravel, getUserByUid } from '@/api/api'
  import { formatDateTime, errorToast } from '@/utils/index'
  import ActionSheet from '@/components/ActionSheet/index'
  import ShareImg from '@/components/ShareImg/index'
  export default {
    data () {
      return {
        subkey: mapKey,
        markers: [],
        polyline: [],
        map: null,
        mapHeight: 500,
        clientHeight: 1000,
        bigMap: false,
        avatar: '',
        nickName: '',
        travel: {
          id: '',
          type: 0,
          origin: '',
          dest: '',
          time: '',
          mobileNo: '',
          num: '',
          price: '',
          via: '',
          remarks: '',
          initialId: '',
          returnId: '',
          qrCode: ''
        },
        shareDetailImg: this.$store.getters.shareImg.index
      }
    },
    components: {
      ActionSheet,
      ShareImg
    },
    methods: {
      mapSwitch () {
        if (this.bigMap) {
          this.bigMap = false
          this.mapHeight = 500
        } else {
          this.bigMap = true
          this.mapHeight = parseInt(this.clientHeight - 330)
        }
      },
      modify (travelId) {
        wx.showModal({
          content: '功能正在开发中~',
          showCancel: false,
          confirmText: '敬请期待',
          success (res) {
            if (res.confirm) {
            }
          }
        })
      },
      phoneCall (phone) {
        if (!this.freeze) {
          if (this.switches.callPhone) {
            wx.makePhoneCall({
              phoneNumber: phone
            })
          } else {
            errorToast('暂时不可用')
          }
        } else {
          errorToast('帐号冻结不能操作')
        }
      },
      returnDetail (returnId) {
        this.getDetail(returnId, false)
      },
      travelDetail (travelId) {
        this.getDetail(travelId, false)
      },
      share () {
        this.$refs.actionSheet.showActionSheet()
      },
      createShareImg (showImg) {
        if (showImg) {
          const url = `../share/main?tid=${this.travel.id}`
          wx.navigateTo({ url })
        } else {
          this.$refs.shareImgCom.createShareImg(this.travel, showImg)
        }
      },
      getShareImgUrl (url) {
        this.shareDetailImg = url
      },
      bindtap (e) {
      },
      getDetail (id, loadUser) {
        wx.showLoading({
          title: '加载中...'
        })
        getTravel(id).then(res => {
          wx.hideLoading()
          let travel = null
          this.travel = travel = res.data
          this.travel.time = formatDateTime(travel.time)
          this.markers = []
          this.markers.push(
            {
              id: 1,
              latitude: parseFloat(travel.originLat),
              longitude: parseFloat(travel.originLng),
              title: travel.origin,
              iconPath: 'origin.png',
              zIndex: 99,
              width: 30,
              height: 30
            },
            {
              id: 2,
              latitude: parseFloat(travel.destLat),
              longitude: parseFloat(travel.destLng),
              title: travel.dest,
              iconPath: 'dest.png',
              zIndex: 99,
              width: 30,
              height: 30
            }
          )
          this.createShareImg(false)
          if (loadUser) {
            this.getUser(travel.uid)
          }
          this.direction(travel)
        })
      },
      getUser (uid) {
        getUserByUid(uid).then(res => {
          if (res.meta.code === 2000) {
            this.avatar = res.data.avatarUrl
            this.nickName = res.data.nickName
          }
        })
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
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      this.clientHeight = clientHeight * rpxR
      const { tid } = this.$root.$mp.query
      if (tid) {
        this.travel.id = tid
        this.getDetail(tid, true)
      }
    },
    computed: {
      ...mapGetters([
        'uid',
        'switches',
        'shareText'
      ])
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
      this.map = new QQMapWX({
        key: mapKey
      })
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    },
    onShareAppMessage (res) {
      return {
        title: this.shareText.detail,
        path: `pages/index/main?tid=${this.travel.id}`,
        imageUrl: this.shareDetailImg
      }
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
    /*@include height-rpx-width-100(500);*/
    width: 100%;
  }
  .nav {
    @include height-rpx-width-100(80);
    @include justify-space-between-align-center;
    font-size: 34rpx;
    background: $cardHeaderBgColor;
    .left {
      @include height-width-text-center(80, 150);
    }
    .right {
      @include height-width-text-center(80, 130);
      .modify {
        @include height-width-100;
        color: $light-blue;
      }
    }
    .switch {
      @include height-width(80, 120);
      @include justify-align-center;
      .slider {
        @include height-width(16, 60);
        @include border-top-bottom-width(5);
      }
    }
  }
  .service {
    width: 100%;
    @include justify-center;
    .header {
      @include height-rpx-width-percent(119, 96%);
      @include justify-space-between-align-center;
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
      margin-bottom: 200rpx;
      @include border-top-width(1);
      .top {
        @include height-rpx-width-100(100);
        @include justify-space-between-align-center;
        .left {
          @include justify-start-align-center;
          font-weight: bold;
          .seats {
            @include height-line(100, 110);
            color: $unimpColor;
            padding-right: 20rpx;
          }
          .price {
            @include height-line(100, 110);
            padding-left: 20rpx;
            color: $priceColor;
          }
        }
        .right {
          @include height-width(100, 100);
          @include justify-align-center;
          .return {
            @include height-width(60, 60);
            @include border-color(1, $dark-blue);
            @include justify-align-center;
            @include border-radius(5);
            color: $unimpColor;
          }
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
          .via, .time {
            .text {
              font-size: 34rpx;
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
    .share {
      @include height-width-percent-text-center(100, 90%);
      background: $gray-blue;
      border-radius: 60rpx;
      font-size: 38rpx;
      color: $white;
    }
  }

</style>
