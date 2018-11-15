<template>

  <view id="test">
    <button type="default" size="default" @click="testBtn">测试</button>
    <view class="data">{{ data }}</view>
    <button type="default" size="default" @click="testBtn2">测试Set</button>
    <view class="data">{{ user.age }}</view>
  </view>

</template>

<script>
import { test } from '@/api/api'

export default {
  data () {
    return {
      data: '',
      user: {
        name: ''
      }
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
    },
    testBtn2 () {
      console.log(this)

      this.$set(this.user, 'age', 18)
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
