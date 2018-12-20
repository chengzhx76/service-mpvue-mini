<template>
  <view id="choose-input">
    <view class="info" :class="[clazz]" @click="choose" hover-class="choose-hover">
      <view class="title">
        <view class="icon">
          <text class="fa fa-car" :class="[icon]"/>
        </view>
        <text :class="['label', { error: validate }]">{{ labelText }}</text>
      </view>
      <view class="input">
        <input placeholder-class="placeholder-color" :placeholder="placeholder" disabled v-model="content"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      clazz: {
        type: String
      },
      icon: {
        type: String
      },
      labelText: {
        type: String
      },
      validate: {
        type: Boolean
      },
      placeholder: {
        type: String
      },
      content: {
        type: String
      }
    },
    data () {
      return {
      }
    },
    methods: {
      choose() {
      },
      confirm() {
      },
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
      input {
        height: 120rpx;
        text-align: right;
        padding-right: 47rpx;
      }
    }
  }

</style>
