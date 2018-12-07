<template>
  <view id="position">
    <view class="header">
      <navigator class="city" url="../city/main"
                 open-type="navigate"
                 hover-class="choose-hover">{{ selectCity }}</navigator>
      <view class="local">
        <input placeholder-class="placeholder-color" @input="input" placeholder="请输入地点"/>
      </view>
    </view>
    <view class="list" :style="{height: listHeight + 'rpx'}">
      <view v-for="(position, index) in positions"
                 @click="selectPosition(position)"
                 class="position"
                 hover-class="choose-hover"
                 :key="index">
        <view class="place">
          <view class="title">{{ position.title }}</view>
          <view class="address">{{ position.address }}</view>
        </view>
        <view class="icon">
          <text class="fa fa-lg fa-map-marker gray-icon"/>
        </view>
      </view>
    </view>
    <!--<button @click="testBtn">ddd</button>-->
  </view>
</template>

<script>
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapKey } from '@/utils/config'

  export default {
    data () {
      return {
        selectCity: '菏泽市',
        posType: 1,
        listHeight: 0,
        map: null,
        positions: []
      }
    },
    methods: {
      input (e) {
        const cursor = e.mp.detail.cursor
        const value = e.mp.detail.value
        if (cursor > 1) {
          const self = this
          this.map.getSuggestion({
            keyword: value,
            region: self.selectCity,
            region_fix: 1,
            success (res) {
              self.listHeight = res.data.length * 135
              self.positions = []
              res.data.forEach(item => {
                self.positions.push({
                  title: item.title,
                  address: item.address,
                  location: item.location
                })
              })
            },
            fail (res) {
              console.log(res)
            }
          })
        } else {
          this.positions = []
          this.listHeight = 0
        }
      },
      selectPosition (position) {
        console.log(position)
        const self = this
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        prevPage.setData({
          'extend.posType': self.posType,
          'extend.position': position
        })
        wx.navigateBack({
          delta: 1
        })
      },
      testBtn () {
        console.log(this.$mp.page)
        /*
        this.map.getSuggestion({
          keyword: '成武',
          region: this.selectCity,
          region_fix: 1,
          success (res) {
            console.log(res)
            console.log(JSON.stringify(res))
          },
          fail (res) {
            console.log(res)
          }
        })
        */
      }
    },
    mounted () {
      const { posType } = this.$root.$mp.query
      if (posType) {
        this.posType = posType
      }
    },
    onShow () {
      if (this.$mp.page.data && this.$mp.page.data.extend) {
        this.selectCity = this.$mp.page.data.extend.selectCity
      }
    },
    onLoad () {
      this.map = new QQMapWX({
        key: mapKey
      })
      this.positions = []
    },
    onUnload () {
      this.positions = []
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #position {
    width: 100%;
    @include column-align-center;
    background: $white;
  }
  .header {
    @include height-rpx-width-100(100);
    @include border-top-width(1);
    @include border-bottom-width(1);
    @include justify-start-align-center;
    .city {
      height: 100rpx;
      min-width: 20rpx;
      line-height: 104rpx;
      padding-left: 15rpx;
      padding-right: 20rpx;
      font-size: 30rpx;
      &:after {
        @include arrow-bottom-left(16, 6, -6);
      }
    }
    .local {
      height: 100rpx;
      max-width: 400rpx;
      @include column-align-center;
      input {
        @include height-width-percent-text(80, 100%, left);
        @include border-left-width(1);
        margin-top: 15rpx;
        padding-left: 20rpx;
      }
    }
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .position {
    @include height-rpx-width-percent(129, 97%);
    @include justify-align-center;
    @include border-bottom-width(1);
    margin-left: 3%;
    .place {
      @include height-rpx-width-percent(129, 80%);
      .title {
        @include height-width-100-text-line(69, left, 80);
        @include over-hidden;
        font-size: 34rpx;
      }
      .address {
        @include height-width-100-text(40, left);
        @include over-hidden;
        font-size: 26rpx;
        color: $unimpColor;
      }
    }
    .icon {
      @include height-rpx-width-percent(129, 20%);
      @include justify-align-center;
    }
  }
</style>
