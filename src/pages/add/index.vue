<template>
  <view id="add">

    <view class="main">

      <view class="tip">填写你的行程</view>

      <view class="service">
        <view class="distance">
          <view class="origin info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-car gray-icon"/>
              </view>
              <view class="text">起点</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="出发地" focus v-model="service.origin"/>
            </view>
          </view>
          <view class="destination info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-map-marker gray-icon"/>
              </view>
              <view class="text">终点</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="目的地" v-model="service.destination"/>
            </view>
          </view>
          <view class="time info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-calendar gray-icon"/>
              </view>
              <view class="text">时间</view>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="乘车时间" v-model="service.time"/>
            </view>
          </view>
          <view class="phone info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-mobile gray-icon"/>
              </view>
              <view class="text">手机</view>
            </view>
            <view class="input">
              <input type="number" maxlength="11" placeholder-class="placeholder-color" placeholder="联系方式" v-model="service.phone"/>
            </view>
          </view>
        </view>
        <view class="remarks">
          <input placeholder-class="placeholder-color" placeholder="填写备注（选填）" v-model="service.remarks"/>
        </view>
      </view>
    </view>
    <view class="release">
      <view class="btn">
        <button type="default" size="default" @click="addDistance" plain="true" hover-class="button-hover">发布行程</button>
      </view>
    </view>

  </view>
</template>

<script>

export default {
  data () {
    return {
      service: {
        origin: '',
        destination: '',
        time: '',
        phone: '',
        remarks: ''
      }
    }
  },
  components: {
  },
  methods: {
    addDistance () {
      console.log(this.service)
    }
  },

  created () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #add {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
  }
  .main {
    width: 93%;
    /*height: 650rpx;*/
    background: #ffffff;
    .tip {
      width: 100%;
      height: 75rpx;
      line-height: 75rpx;
      font-size: 28rpx;
      color: #989898;
      background: #F0F0F0;
    }
    .service {
      width: 100%;
      /*height: 100%;*/
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      background: #F0F0F0;
      .distance {
        width: 100%;
        border-radius: 10rpx;
        border: 2rpx solid #EDEDED;
        /*box-shadow:1px 1px 5px #BEBEBE;*/
        background: #ffffff;
        .info {
          width: 100%;
          height: 120rpx;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          border-bottom: 1rpx solid #EDEDED;
          .title {
            width: 40%;
            height: 120rpx;
            color: #313131;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            .icon {
              height: 120rpx;
              width: 80rpx;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
            }
            .text {
              height: 120rpx;
              /*width: 80rpx;*/
              line-height: 115rpx;
              font-size: 34rpx;
            }
          }
          .input {
            width: 60%;
            input {
              text-align:right;
              padding-right: 24rpx;
            }
          }
        }
        .phone {
          border-bottom: none;
        }
        .origin .input, .destination .input {
          font-size: 40rpx;
          color: #313131;
        }
        .time .input, .phone .input {
          font-size: 34rpx;
          color: #6B6B6B;
        }
      }
      .remarks {
        width: 100%;
        height: 115rpx;
        border-radius: 10rpx;
        margin-top: 50rpx;
        padding-left: 30rpx;
        /*box-shadow:1px 1px 5px #E6E6E6;*/
        background: #ffffff;
        border: 2rpx solid #EDEDED;
        input {
          width: 100%;
          height: 100%;
          font-size: 36rpx;
          color: #313131;
        }
      }
    }

  }
  .release {
    height: 160rpx;
    width: 100%;
    border-top: 1rpx solid #E2E2E2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    .btn {
      height: 100rpx;
      width: 90%;
    }
  }
</style>
