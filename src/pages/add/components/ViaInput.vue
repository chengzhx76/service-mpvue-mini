<template>
  <view id="via-input">
    <view class="info" :class="[clazz]">
      <view class="title">
        <view class="icon">
          <text class="fa fa-sm gray-icon" :class="[icon]"/>
        </view>
        <text class="label">{{ labelText }}</text>
      </view>
      <view class="input">
        <input placeholder-class="placeholder-color"
               :placeholder="placeholder"
               @focus="hidePicker"
               v-model.lazy="via"/>
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
      }
    },
    data () {
      return {
        via: ''
      }
    },
    methods: {
      hidePicker () {
        this.$emit('input')
      }
    },
    watch: {
      via (val) {
        if (val) {
          this.$emit('via', val)
        }
      }
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    },
    computed: {
      clazz () {
        return this.type === 'via' ? 'via' : ''
      },
      icon () {
        return this.type === 'via' ? 'fa-level-up' : ''
      },
      labelText () {
        return this.type === 'via' ? '途经' : ''
      },
      placeholder () {
        return this.type === 'via' ? '途经地（选填）' : ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "./index.scss";
  #via-input {
  }
</style>
