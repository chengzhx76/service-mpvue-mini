<template>

  <view id="test">
    <view class="main">
      <view class="main_item">
        <movable-area>
          <movable-view out-of-bounds="true"
                        direction="horizontal"
                        :x="x"
                        animation="false"
                        damping="100"
                        @change="movableChange"
                        @touchend="touchEnd"
                        @touchstart="touchStart">
            <view class="main_item_content ">
              这里是内容区域
            </view>
          </movable-view>
        </movable-area>
        <view class="delete_btn">删除</view>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    data () {
      return {
        x: 0,
        isTouch: true
      }
    },
    methods: {
      movableChange (e) {
        let currentX = e.mp.detail.x
        if (this.isTouch) {
          this.x = currentX
        }
        if (currentX === 0 || currentX === -100) {
          this.isTouch = true
        }
        console.log(currentX)
      },
      touchStart (e) {
      },
      touchEnd () {
        console.log('-->end')
        this.isTouch = false
        console.log(this.x)
        if (this.x <= -40) {
          this.x = -100
        } else {
          this.x = 0
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #test {
    width: 100%;
  }
  .main {
    width: 100%;
    display: flex;
    align-items: center;
    background: darkkhaki;
    .main_item {
      display: flex;
      width: 100%;
      background: darkgoldenrod;
      movable-area {
        height: 200rpx;
        width: calc(100% - 200rpx);
        background: #fff;
        z-index: 999;
        movable-view {
          height: 200rpx;
          width: calc(100% + 200rpx);
          background: darkorange;
          .main_item_content {
            width: 100%;
            height: 200rpx;
            line-height: 200rpx;
            background: violet;
          }
        }
      }
      .delete_btn {
        width: 200rpx;
        height: 200rpx;
        background-color: #ff81b4;
        text-align: center;
        line-height: 200rpx;
      }
    }
  }

</style>
