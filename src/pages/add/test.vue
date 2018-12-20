<template>
  <view id="test">
    <choose-input clazz="origin" icon="fa-car" labelText="起点" validate="true" placeholder="请输入起点" content="成武" @choose="chooseOrigin"/>

    <!--<button @click="showModal">点我</button>-->
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
      chooseOrigin () {
        console.log('---------------')
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
