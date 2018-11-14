<template>

  <view id="test">
    <button type="default" size="default" @click="testBtn">测试</button>
    <view class="data">{{ data }}</view>
  </view>

</template>

<script>
import { test } from '@/api/api'

export default {
  data () {
    return {
      data: ''
    }
  },
  methods: {
    testBtn () {
      test('123').then(res => {
        console.log(res)
        this.data = res.data
      }).catch((e) => {
        console.error(e)
      })
    }
  },
  created () {
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #test {
    @include height-width-100;
    @include column-align-center;
  }
  .data {
    @include height-rpx-width-100(50);
  }


</style>
