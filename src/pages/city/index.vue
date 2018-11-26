<template>

  <view id="city">
    <view class="select">
      <input placeholder-class="placeholder-color" @input="input" placeholder="请输入城市名称" v-model="selectCity"/>
    </view>
    <view class="list">
      <navigator v-for="(city, index) in list"
                 :url="'../position/main?city=' + city"
                 open-type="redirect"
                 hover-class="choose-hover"
                 class="city"
                 :key="index">{{ city }}</navigator>
    </view>
    <button @click="testBtn">搜索</button>
  </view>

</template>

<script>
  import { getCites } from '@/api/api'
  import { mapKey } from '@/utils/config'
  import QQMapWX from '@/libs/qqmap-wx-jssdk'

  export default {
    data () {
      return {
        list: null,
        map: null,
        selectCity: ''
      }
    },
    methods: {
      input (e) {
        const cursor = e.mp.detail.cursor
        const value = e.mp.detail.value
        if (cursor > 1) {
          getCites(value).then(res => {
            res.data.forEach(item => {
              this.list.push(item.city)
            })
          })
        }
      },
      select (city) {
        this.list = []
        console.log(city)
        this.selectCity = city
      },
      testBtn () {
        this.map.getCityList({
          success (res) {
            console.log(res)
            // console.log(JSON.stringify(res))
          },
          fail (res) {
            console.log(res)
          }
        })
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
  #city {
    @include height-width-100;
    @include column-align-center;
    background: $white;
  }
  .select {
    @include height-rpx-width-100(110);
    @include border-top-width(1);
    @include border-bottom-width(1);
    input {
      @include height-width-100;
      font-size: 36rpx;
      padding-left: 20rpx;
    }
  }
  .list {
    width: 100%;
    .city {
      @include height-width-percent-text(89, 95%, left);
      @include border-bottom-width(1);
      margin-left: 5%;
    }
  }

</style>
