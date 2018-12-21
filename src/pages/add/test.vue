<template>
  <view id="test">
    <choose-input ref="originInput" type="origin" @address="getOrigin"/>

    <button @click="getAddress">点我</button>
  </view>
</template>

<script>
  import ChooseInput from './components/ChooseInput'
  export default {
    data () {
      return {
      }
    },
    components: {
      ChooseInput
    },
    methods: {
      getAddress () {
        this.$refs.originInput.getAddress()
      },
      getOrigin (address) {
        console.log('---------------' + address)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #test {
    width: 100%;
    height: 100%;
  }
</style>
