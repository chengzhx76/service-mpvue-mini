<template>

  <view class="test">
    <button type="default" size="default" @click="testBtn">测试1</button>
    <button type="default" size="default" @click="testBtn2">测试2</button>
  </view>

</template>

<script>
// Use Vuex
import { test, test2 } from '@/api/api'

export default {
  methods: {
    testBtn () {
      test('11')
    },
    testBtn2 () {
      test2('22')
    }
  }
}
</script>

<style>
</style>
