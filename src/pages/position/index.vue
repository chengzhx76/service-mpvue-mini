<template>
  <view id="position">
    <view class="header">
      <view class="city">{{ selectCity }}</view>
      <view class="local">
        <input placeholder-class="placeholder-color" @input="input" placeholder="请输入地点" v-model="selectCity"/>
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
        selectCity: '呼和浩特市',
        positions: null
      }
    },
    methods: {
    },
    mounted () {
      console.log(this.$root.$mp.query)
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
    @include height-rpx-width-100(110);
    @include border-top-width(1);
    @include border-bottom-width(1);
    @include justify-start-align-center;
    .city {
      height: 110rpx;
      min-width: 20rpx;
      line-height: 110rpx;
      padding-left: 15rpx;
      padding-right: 20rpx;
      &:after {
        @include arrow-bottom-left(16, 6, -8);
      }
    }
    .local {
      height: 110rpx;
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
</style>
