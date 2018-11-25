<template>

  <view id="city">
    <view class="select">
      <input placeholder-class="placeholder-color" @input="input" placeholder="请输入城市名称" v-model="selectCity"/>
    </view>
    <view class="list">
      <view v-for="(city, index) in list"
            class="city"
            @click="select(city)"
            :key="index"
            hover-class="choose-hover">{{ city }}</view>
    </view>
    <button @click="testBtn">搜索</button>
  </view>

</template>

<script>
  import QQMapWX from '@/libs/qqmap-wx-jssdk'
  import { mapKey } from '@/utils/config'

  export default {
    data () {
      return {
        cites: [
          '11134',
          '22222255',
          '北京市',
          '菏泽市',
          '郑州市',
          '商丘市',
          '济南市'
        ],
        list: null,
        selectCity: ''
      }
    },
    methods: {
      input (e) {
        const cursor = e.mp.detail.cursor
        const value = e.mp.detail.value
        console.log(value)
        if (cursor > 1) {
          this.list = this.cites.filter(item => {
            return item.indexOf(value) !== -1
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
