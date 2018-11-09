<template>
  <view id="filter">
    <view class="header">

      <view class="tip">填写你的行程</view>

      <view class="condition">
        <view class="origin info">
          <view class="label">起点</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="出发地"/>
          </view>
        </view>
        <view class="destination info">
          <view class="label">终点</view>
          <view class="input">
            <input placeholder-class="placeholder-color" placeholder="目的地"/>
          </view>
        </view>
      </view>

    </view>
    <view class="footer">

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
    background: darkgoldenrod;

    .condition {
      @include height-rpx-width-100(160);
      background: darkcyan;
      .info {
        @include height-rpx-width-100(80);
        @include justify-start-align-center;
        .label {
          @include height-width-percent-text-center(80, 20%);
          background: darkolivegreen;
        }
        .input {
          @include height-100-width-percent(80%);
          background: salmon;
        }
      }
      .origin {
        background: darkkhaki;
      }
    }

  }

</style>
