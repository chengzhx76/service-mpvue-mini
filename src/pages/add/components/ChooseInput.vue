<template>
  <view id="choose-input">
    <view class="info" :class="[clazz]" @click="choose" hover-class="choose-hover">
      <view class="title">
        <view class="icon">
          <text class="fa gray-icon" :class="[icon]"/>
        </view>
        <text class="label" :class="{ error: validate }">{{ labelText }}</text>
      </view>
      <view class="input">
        <input placeholder-class="placeholder-color" :placeholder="placeholder" disabled v-model.lazy="location.title"/>
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
        type: String,
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
        const url = `../position/main?posType=${this.type}`
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
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    },
    onShow () {
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
        if (posType && title) {
          this.$emit('address', { posType, location })
        }

        this.$parent.$mp.page.setData({
          extend: null
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "./index.scss";
  #choose-input {
  }
  .error {
    color: #CF5B56;
  }
</style>
