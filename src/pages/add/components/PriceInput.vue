<template>
  <view id="price-input">
    <view class="info" :class="[clazz]">
      <view class="warp">
        <view class="title" hover-class="choose-hover" @click="choose">
          <view class="icon">
            <text class="fa gray-icon" :class="[icon]"/>
          </view>
          <text class="label" :class="{ error: validate }">{{ labelText }}</text>
        </view>

        <view class="input" @click="chooseInputPay">
          <input type="number"
                 placeholder-class="placeholder-color"
                 :placeholder="placeholder"
                 :disabled="priceDisabled"
                 v-model.lazy="price"
                 @focus="hidePicker"/>
        </view>
      </view>
      <view class="choose-picker" v-if="showPicker">
        <picker-view class="picker left" indicator-style="height: 50rpx;" :value="payVal" @change="payChange">
          <picker-view-column>
            <view class="item" v-for="(pay, index) in pays" :key="index">{{ pay }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
  import { isMoney } from '@/utils/validate'
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
        price: '',
        payVal: [0],
        pays: ['面议', '自定义'],
        priceDisabled: false
      }
    },
    methods: {
      choose () {
        this.$emit('choose', this.type)
      },
      chooseInputPay () {
        if (this.priceDisabled) {
          this.$emit('choose', this.type)
        }
      },
      payChange (e) {
        this.payVal = e.mp.detail.value
      },
      hidePicker () {
        this.$emit('input')
      }
    },
    watch: {
      payVal (val) {
        this.price = this.pays[val[0]] === '自定义' ? '' : this.pays[val[0]]
        this.priceDisabled = this.pays[val[0]] === '面议'
        if (this.price === '面议' || isMoney(this.price)) {
          this.$emit('price', this.price)
        }
      },
      price (val) {
        if (val && isMoney(val)) {
          this.$emit('price', val)
        }
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
      this.price = this.pays[this.payVal[0]]
      this.priceDisabled = this.pays[this.payVal[0]] === '面议'
      if (this.price === '面议' || isMoney(this.price)) {
        this.$emit('price', this.price)
      }
    },
    computed: {
      clazz () {
        return this.type === 'price' ? 'price' : ''
      },
      icon () {
        return this.type === 'price' ? 'fa-jpy' : ''
      },
      labelText () {
        return this.type === 'price' ? '价格' : ''
      },
      placeholder () {
        return this.type === 'price' ? '价格（每人）' : ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "./index.scss";
  #price-input {
  }
  .info {
    .warp {
      .title {
        width: 65%;
      }
      .input {
        width: 35%;
      }
    }
  }
</style>
