<template>

  <view class="test">
    <button type="default" size="default" @click="testBtn">测试1</button>
    <button type="default" size="default" @click="testBtn2">测试2</button>
    <view class="data">ss {{ data }}</view>
  </view>

</template>

<script>
import { test, test2 } from '@/api/api'

export default {
  data () {
    return {
      data: 'sss'
    }
  },
  methods: {
    testBtn () {
      test().then(res => {
        console.log(res)
        this.data = res.data
      })
    },
    testBtn2 () {
      test2('22').then(res => {
        console.log(res)
      })
    }
  },
  created () {

  }
}
</script>

<style>
</style>
