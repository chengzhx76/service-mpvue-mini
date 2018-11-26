<template>
  <view id="position">
    <view class="header">
      <view class="city">{{ selectCity }}</view>
      <view class="local">
        <input placeholder-class="placeholder-color" @input="input" placeholder="请输入地点" v-model="city"/>
      </view>
    </view>
    <view class="list" :style="{height: listHeight + 'rpx'}">
      <view v-for="(position, index) in positions"
        class="position"
        @click="select(position)"
        :key="index"
        hover-class="choose-hover"
      >
        <view class="place">
          <view class="title">{{ position.title }}</view>
          <view class="address">{{ position.address }}</view>
        </view>
        <view class="icon">
          <text class="fa fa-lg fa-map-marker gray-icon"/>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapKey } from '@/utils/config'

  export default {
    data () {
      return {
        selectCity: '菏泽市',
        city: '',
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
            region: this.selectCity,
            region_fix: 1,
            success (res) {
              self.listHeight = res.data.length * 131
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
      testBtn () {
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
      }
    },
    mounted () {
      const { city } = this.$root.$mp.query
      if (city) {
        this.selectCity = city
      }
    },
    created () {
      this.map = new QQMapWX({
        key: mapKey
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #position {
    @include height-width-100;
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
      line-height: 100rpx;
      padding-left: 15rpx;
      padding-right: 20rpx;
      &:after {
        @include arrow-bottom-left(16, 6, -8);
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
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 36rpx;
      }
      .address {
        @include height-width-100-text(40, left);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 28rpx;
      }
    }
    .icon {
      @include height-rpx-width-percent(129, 20%);
      @include justify-align-center;
    }
  }
</style>
