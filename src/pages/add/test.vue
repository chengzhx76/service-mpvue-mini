<template>
  <view id="test">
    <choose-input type="origin" :validate="formValidate.origin" :location="service.origin"/>
    <choose-input type="dest" :validate="formValidate.dest" :location="service.dest"/>

    <button @click="submit()">点我</button>
  </view>
</template>

<script>
  import ChooseInput from './components/ChooseInput'
  export default {
    data () {
      return {
        service: {
          origin: {
            title: '',
            lat: '',
            lng: ''
          },
          dest: {
            title: '',
            lat: '',
            lng: ''
          }
        },
        formValidate: {
          origin: false,
          dest: false
        }
      }
    },
    components: {
      ChooseInput
    },
    methods: {
      submit () {
        this.formValidate.origin = true
      }
    },
    onShow () {
      console.log(this)
      if (this.$mp &&
        this.$mp.page &&
        this.$mp.page.data.extend &&
        this.$mp.page.data.extend.position) {
        const posType = this.$mp.page.data.extend.posType
        const title = this.$mp.page.data.extend.position.title
        const { lat, lng } = this.$mp.page.data.extend.position.location
        const location = {
          title: title,
          lat: lat,
          lng: lng
        }
        if (posType === '1') {
          this.service.origin = location
        } else {
          this.service.dest = location
        }

        this.$mp.page.setData({
          extend: null
        })
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
