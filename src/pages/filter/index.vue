<template>
  <view id="filter">
    <view class="header">

      <view class="tip">填写你的筛选条件</view>

      <view class="condition">
        <view class="origin info">
          <view class="label">出发地</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="填写出发地"/>
          </view>
        </view>
        <view class="destination info">
          <view class="label">目的地</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="填写目的地"/>
          </view>
        </view>
        <view class="type info">
          <view class="label">类型</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="人找车"/>
          </view>
        </view>
        <view class="time info">
          <view class="label">出发时间</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="11月10号 周六 14:12"/>
          </view>
        </view>
        <view class="number info">
          <view class="label">人数</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="2"/>
          </view>
        </view>
      </view>

    </view>
    <view class="footer">
      <view class="arrow-1"></view>
      <view class="arrow-2"></view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";
  @import "@/styles/mixin.scss";

  #filter {
    @include height-width-100;
  }
  .header {
    @include height-rpx-width-100(600);
    @include column-align-center;
    /*background: darkgoldenrod;*/
    .condition {
      @include height-rpx-width-100(456);
      background: $white;
      .info {
        @include height-rpx-width-100(90);
        @include border-bottom-width(1);
        @include justify-start-align-center;
        .label {
          @include height-width-percent-text(90, 22%, left);
          margin-left: 3%;
        }
        .input {
          @include height-rpx-width-percent(90, 75%);
          position: relative;
          input {
            @include height-width-100-text(90, left);
          }
        }
        .input:after {
          @include arrow(10, 30, 40);
        }
      }
      .origin {
        @include border-top-width(1);
        /*background: #fa4d5c;*/
        input {
          /*background: darkgreen;*/
        }
      }
    }

  }
</style>
