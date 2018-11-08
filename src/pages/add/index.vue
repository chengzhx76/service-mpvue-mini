<template>
  <view id="add">

    <view class="main-nav">
      <view class="left nav active">乘客</view>
      <view class="right nav">车主</view>
    </view>

    <view class="main">

      <view class="tip">填写你的行程</view>

      <view class="service">
        <view class="distance">
          <view class="origin info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-car gray-icon"/>
              </view>
              <text class="label">起点</text>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="出发地" v-model="service.origin"/>
            </view>
          </view>
          <view class="destination info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-lg fa-map-marker gray-icon"/>
              </view>
              <text class="label">终点</text>
            </view>
            <view class="input">
              <input placeholder-class="placeholder-color" placeholder="目的地" v-model="service.destination"/>
            </view>
          </view>
          <view class="time info">
            <view class="title">
              <view class="icon">
                <text class="fa fa-clock-o gray-icon"/>
              </view>
              <text class="label">时间</text>
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
              <text class="label">手机</text>
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
      <button class="release-button" type="default" size="default" @click="addDistance" hover-class="button-hover">发布行程</button>
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
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  #add {
    @include height-width-100;
    @include column-align-center;
  }
  .main-nav {
    @include height-rpx-width-percent(90, 93%);
    @include border-radius(80);
    display: flex;
    margin-top: 30rpx;
    margin-bottom: 10rpx;
    @include border(1);
    background: $white;
    .nav {
      @include height-width-percent-text-center(90, 50%);
      font-size: 36rpx;
      color: $navColor;
    }
    .left {
      @include border-radius-left(80);
    }
    .right {
      @include border-radius-right(80);
    }
    .active {
      background: #78B4E1;
      color: $white;
    }
  }

  .main {
    width: 93%;
    background: $pageBg;
    .tip {
      @include height-rpx-width-100(75);
      line-height: 75rpx;
      font-size: 28rpx;
      color: $tipColor;
      background: $pageBg;
    }
    .service {
      width: 100%;
      @include justify-space-between;
      background: $pageBg;
      .distance {
        width: 100%;
        @include border-radius(10);
        @include border(2);
        @include box-shadow;
        background: $white;
        .info {
          @include height-rpx-width-100(120);
          @include justify-start-align-center;
          @include border-bottom-width(1);
          .title {
            @include height-rpx-width-percent(120, 40%);
            color: $titleColor;
            @include justify-start-align-center;
            .icon {
              @include height-width(120, 80);
              @include justify-align-center;
            }
            .label {
              height: 120rpx;
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
          @include border-none('bottom')
        }
        .origin .input, .destination .input {
          font-size: 40rpx;
          color: $inputColor;
        }
        .time .input, .phone .input {
          font-size: 34rpx;
          color: $inputUnimpColor;
        }
      }
      .remarks {
        @include height-rpx-width-100(115);
        border-radius: 10rpx;
        margin-top: 25rpx;
        padding-left: 30rpx;
        @include box-shadow;
        background: $white;
        @include border(2);
        input {
          @include height-width-100;
          font-size: 36rpx;
          color: $inputColor;
        }
      }
    }

  }
  .release {
    @include height-rpx-width-100(160);
    position: fixed;
    left: 0;
    bottom: 0;
    @include border-top-width(1);
    @include justify-align-center;
    background: $white;
  }
</style>
