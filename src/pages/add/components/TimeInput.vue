<template>
  <view id="time-input">
    <view class="time info">
      <view class="warp" hover-class="choose-hover" @click="chooseTime">
        <view class="title">
          <view class="icon">
            <text class="fa fa-clock-o gray-icon"/>
          </view>
          <text :class="['label', { error: validate }]">时间</text>
        </view>
        <view class="input">
          <input placeholder-class="placeholder-color" placeholder="乘车时间" disabled v-model="service.time"/>
        </view>
      </view>
      <view class="choose-picker" v-if="showTimePicker">
        <picker-view class="picker left"  indicator-style="height: 50rpx;" :value="dayVal" @change="dayChange">
          <picker-view-column>
            <view class="item" v-for="(day, index) in days" :key="index">{{ day }}</view>
          </picker-view-column>
        </picker-view>
        <picker-view class="picker right" indicator-style="height: 50rpx;" :value="timeVal" @change="timeChange">
          <picker-view-column>
            <view class="item" v-for="(time, index) in times" :key="index">{{ time }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(minute, index) in minutes" :key="index">{{ minute }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      type: {
        type: Number,
        required: true
      },
      validate: {
        type: Boolean,
        required: true
      },
      location: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        showTimePicker: true
      }
    },
    methods: {
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #choose-input {
  }
  .info {
    width: 100%;
    @include justify-start-align-center;
    @include border-bottom-width(1);
    background: $white;
    .title {
      @include height-rpx-width-percent(120, 25%);
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
      height: 120rpx;
      width: 75%;
      font-size: 40rpx;
      color: $inputColor;
      position: relative;
      &:after {
        @include arrow(16, 25, 52);
      }
      input {
        height: 120rpx;
        text-align: right;
        padding-right: 47rpx;
      }
    }
  }
  .error {
    color: #CF5B56;
  }
</style>
