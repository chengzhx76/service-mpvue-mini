<template>
  <view id="index">
    <button @click="handler">BTN</button>
    <text class="fa fa-paper-plane-o"></text>
    <text class="fa fa-paper-plane-o" aria-hidden="true"></text>
  </view>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    handler () {
      const url = '../add/main'
      wx.navigateTo({ url })
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
