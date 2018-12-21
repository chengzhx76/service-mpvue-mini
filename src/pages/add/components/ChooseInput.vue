<template>
  <view id="choose-input">
    <view class="info" :class="[clazz]" @click="choose" hover-class="choose-hover">
      <view class="title">
        <view class="icon">
          <text class="fa gray-icon" :class="[icon]"/>
        </view>
        <text :class="['label', { error: validate }]">{{ labelText }}</text>
      </view>
      <view class="input">
        <input placeholder-class="placeholder-color" :placeholder="placeholder" disabled v-model="location.title"/>
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
      }
    },
    methods: {
      choose () {
        const posType = this.type === 'origin' ? '1' : '2'
        const url = `../position/main?posType=${posType}`
        wx.navigateTo({ url })
      }
    },
    computed: {
      clazz () {
        return this.type === 'origin' ? 'origin' : 'dest'
      },
      icon () {
        return this.type === 'origin' ? 'fa-car' : 'fa-map-marker'
      },
      labelText () {
        return this.type === 'origin' ? '起点' : '终点'
      },
      placeholder () {
        return this.type === 'origin' ? '请选择起点' : '请选择终点'
      }
    }
    /*
    ,
    onShow () {
      console.log(this)
      if (this.$parent &&
        this.$parent.$mp &&
        this.$parent.$mp.page &&
        this.$parent.$mp.page.data.extend &&
        this.$parent.$mp.page.data.extend.position) {
        const posType = this.$parent.$mp.page.data.extend.posType
        const title = this.$parent.$mp.page.data.extend.position.title
        const { lat, lng } = this.$parent.$mp.page.data.extend.position.location
        const location = {
          title: title,
          lat: lat,
          lng: lng
        }
        this.$emit('address', { posType, location })

        this.$parent.$mp.page.setData({
          extend: null
        })
      }
    }
    */
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
