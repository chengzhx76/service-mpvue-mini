<template>
  <view id="phone-input">
    <view  class="info" :class="[clazz]">
      <view class="title">
        <view class="icon">
          <text class="fa fa-lg gray-icon" :class="[icon]"/>
        </view>
        <text class="label" :class="{ error: validate }">{{ labelText }}</text>
      </view>
      <view class="input">
        <input type="number" maxlength="11"
               placeholder-class="placeholder-color"
               :placeholder="placeholder"
               @focus="hidePicker"
               v-model.lazy="phone"/>
      </view>
    </view>
  </view>
</template>

<script>
  import { isMobile } from '@/utils/validate'
  export default {
    props: {
      type: {
        type: String,
        required: true
      },
      validate: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        phone: this.$store.getters.mobileNo
      }
    },
    watch: {
      phone (val) {
        if (val && isMobile(val)) {
          this.$emit('phone', val)
        }
      }
    },
    methods: {
      hidePicker () {
      }
    },
    computed: {
      clazz () {
        return this.type === 'phone' ? 'phone' : ''
      },
      icon () {
        return this.type === 'phone' ? 'fa-mobile' : ''
      },
      labelText () {
        return this.type === 'phone' ? '手机' : ''
      },
      placeholder () {
        return this.type === 'phone' ? '联系方式' : ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "./index.scss";
  #phone-input {
  }
</style>
