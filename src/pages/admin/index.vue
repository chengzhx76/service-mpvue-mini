<template>

  <view id="admin">

    <view class="cell add-switch">
      <view class="content">
        <view class="label">添加行程</view>
        <view class="operate">
          <switch :checked="addSwitch" @change="addSwitch" color="#76ABEF"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary">提交</button>
      </view>
    </view>
    <view class="cell index-page-num">
      <view class="content">
        <view class="label">首页显示</view>
        <view class="operate">
          <input type="number" placeholder="条数"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary">提交</button>
      </view>
    </view>

    <view class="cell list-page-num">
      <view class="content">
        <view class="label">列表页显示</view>
        <view class="operate">
          <input type="number" placeholder="条数"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary">提交</button>
      </view>
    </view>
    <button @click="refreshConfig()" type="primary">刷新</button>
  </view>

</template>

<script>
  export default {
    data () {
      return {
        addSwitch: true
      }
    },
    methods: {
      addSwitch (e) {
        console.log(e)
      },
      refreshConfig () {
      }
    },
    onLoad () {
    },
    onUnload () {
    },
    created () {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #admin {
    @include height-width-100;
  }
  .cell {
    @include height-rpx-width-100(100);
    @include border-top-bottom-width(1);
    @include justify-start-align-center;
    margin-bottom: 10rpx;
    background: $white;
    .content {
      @include height-rpx-width-percent(100, 80%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        height: 100rpx;
        width: 280rpx;
        padding-right: 10rpx;
        line-height: 100rpx;
        padding-left: 15rpx;
      }
      .operate {
        input {
          height: 100rpx;
          line-height: 100rpx;
          text-align: right;
          padding-right: 20rpx;
        }
      }
    }
    .btn {
      @include height-rpx-width-percent(100, 20%);
      .submit {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        text-decoration: none;
        line-height: 100rpx;
        border-radius: 0;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
      }
    }
  }
  .index-page-num {
  }
  .add-switch {
  }
</style>
