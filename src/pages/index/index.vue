<template>
  <view id="index">

    <view class="main">

      <view class="tip">填写你的行程</view>

      <view class="service">
        <view class="distance">
          <view class="origin info">
            <view class="title">
              <view class="icon">
                <icon type="success" size="20"/>
              </view>
              <view class="text">起点：</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="出发地"/>
            </view>
          </view>
          <view class="destination info">
            <view class="title">
              <view class="icon">
                <icon type="success" size="20"/>
              </view>
              <view class="text">终点：</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="目的地"/>
            </view>
          </view>
          <view class="time info">
            <view class="title">
              <view class="icon">
                <icon type="success" size="20"/>
              </view>
              <view class="text">时间：</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="乘车时间"/>
            </view>
          </view>
          <view class="phone info">
            <view class="title">
              <view class="icon">
                <icon type="success" size="20"/>
              </view>
              <view class="text">手机：</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="联系方式"/>
            </view>
          </view>
        </view>
        <view class="remarks">
          ddd
        </view>
      </view>

    </view>

    <view class="release">
      <view class="btn">
        <button type="default" size="default" @click="handler" plain="true" hover-class="button-hover">发布行程</button>
      </view>
    </view>

  </view>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    handler () {
      console.log('--------------')
    }
  },

  created () {
  }
}
</script>

<style scoped>
  #index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
    /*background: darkslateblue;*/
  }
  .main {
    width: 93%;
    /*height: 650rpx;*/
    background: #ffffff;
    /*background: red;*/
  }
  .main .tip {
    width: 100%;
    height: 75rpx;
    line-height: 75rpx;
    font-size: 14px;
    color: #989898;
    background: #F0F0F0;
    /*background: beige;*/
  }
  .main .service {
    width: 100%;
    /*height: 100%;*/
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    background: #F0F0F0;
  }
  .main .service .distance {
    width: 100%;
    /*height: 510rpx;*/
    border-radius: 5px;
    border: 1px solid #EDEDED;
    background: #ffffff;
  }
  .main .service .distance .info {
    width: 100%;
    height: 120rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #EDEDED;
    /*background: darkgrey;*/
  }
  .main .service .distance .info .title {
    width: 40%;
    height: 120rpx;
    color: #313131;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
  .main .service .distance .info .title .icon {
    height: 120rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }
  .main .service .distance .info .title .text {
    height: 120rpx;
    line-height: 120rpx;
    font-size: 18px;
    margin-left: 15rpx;
  }
  .main .service .distance .info .input {
    width: 60%;
  }
  .main .service .distance .info .input input {
    text-align:right;
    font-size: 16px;
    padding-right: 10px;
  }
  .main .service .distance .phone {
    border-bottom: none;
  }
  .main .service .distance .origin .input, .destination .input {
    color: #313131;
  }
  .main .service .distance .time .input, .phone .input {
    color: #6B6B6B;
  }



  .main .service .remarks {
    width: 100%;
    height: 115rpx;
    border-radius: 5px;
    margin-top: 25rpx;
    background: forestgreen;
  }
  .release {
    height: 160rpx;
    width: 100%;
    border-top: 1px solid #E2E2E2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
  }
  .release .btn {
    height: 100rpx;
    width: 90%;
  }
  .button-hover {
    background-color: red;
  }
</style>
