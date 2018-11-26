<template>
  <view id="position">
    <view class="header">
      <view class="city">
        <input placeholder-class="placeholder-color" placeholder="城市名称" v-model=""/>
      </view>
      <view class="local">
        <input placeholder-class="placeholder-color" @input="input" placeholder="请输入地点" v-model=""/>
      </view>
    </view>
    <view class="list">
      <view v-for="(position, index) in positions"
            class="position"
            @click="select(position)"
            :key="index"
            hover-class="choose-hover">{{ position }}</view>
    </view>

  </view>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #position {
    @include height-width-100;
  }
</style>
