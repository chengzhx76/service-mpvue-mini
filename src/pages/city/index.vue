<template>

  <view id="city">
    <view class="select">
      <input placeholder-class="placeholder-color" @input="input" placeholder="请输入城市名称"/>
    </view>
    <view class="list">
      <navigator v-for="(city, index) in list"
                 :url="'../position/main?city=' + city"
                 open-type="redirect"
                 hover-class="choose-hover"
                 class="city"
                 :key="index">{{ city }}</navigator>
    </view>
    <!--<button @click="testBtn">搜索</button>-->
  </view>

</template>

<script>
  import { getCites } from '@/api/api'
  import { mapKey } from '@/utils/config'
  import QQMapWX from '@/libs/qqmap-wx-jssdk'

  export default {
    data () {
      return {
        list: [],
        map: null
      }
    },
    methods: {
      input (e) {
        const cursor = e.mp.detail.cursor
        const value = e.mp.detail.value
        if (cursor > 1) {
          this.list = []
          getCites(value).then(res => {
            res.data.forEach(item => {
              this.list.push(item.city)
            })
          })
        }
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
    onLoad () {
      this.list = []
    },
    onUnload () {
      this.list = []
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
    @include height-rpx-width-100(98);
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
      @include height-width-percent-text(109, 95%, left);
      @include border-bottom-width(1);
      margin-left: 5%;
    }
  }

</style>
