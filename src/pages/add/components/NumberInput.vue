<template>
  <view id="number-input">
    <view class="info" :class="[clazz]">
      <view class="warp" hover-class="choose-hover" @click="choose">
        <view class="title">
          <view class="icon">
            <text class="fa gray-icon" :class="[icon]"/>
          </view>
          <text :class="['label', { error: validate }]">{{ labelText }}</text>
        </view>
        <view class="input">
          <input placeholder-class="placeholder-color" :placeholder="placeholder" disabled v-model="number"/>
        </view>
      </view>
      <view class="choose-picker" v-if="showPicker">
        <picker-view class="picker left" indicator-style="height: 50rpx;" :value="numVal" @change="numChange">
          <picker-view-column>
            <view class="item" v-for="(num, index) in nums" :key="index">{{ num }}</view>
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
        type: String,
        required: true
      },
      validate: {
        type: Boolean,
        required: true
      },
      showPicker: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        number: '',
        numVal: [0],
        nums: [1, 2, 3, 4, 5, 6]
      }
    },
    methods: {
      choose () {
        this.$emit('choose', this.type)
      },
      numChange (e) {
        this.numVal = e.mp.detail.value
      }
    },
    watch: {
      numVal (val) {
        this.number = this.nums[val[0]]
      }
    },
    onLoad () {
      this.number = this.nums[this.numVal[0]]
    },
    computed: {
      clazz () {
        return this.type === 'number' ? 'number' : ''
      },
      icon () {
        return this.type === 'number' ? 'fa-heart-o' : ''
      },
      labelText () {
        return this.type === 'number' ? '人数' : ''
      },
      placeholder () {
        return this.type === 'number' ? '选择人数' : ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "./index.scss";
  #number-input {
  }
  .info {

  }
</style>
