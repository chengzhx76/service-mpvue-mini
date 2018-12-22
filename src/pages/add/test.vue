<template>
  <view id="test">
    <choose-input type="origin" :validate="formValidate.origin" :location="service.origin"/>
    <choose-input type="dest" :validate="formValidate.dest" :location="service.dest"/>
    <time-input type="time" :validate="formValidate.time" :showPicker="showPicker.time" @choose="chooseTime" @time="getTime"/>
    <time-input type="retTime" :validate="formValidate.retTime" :showPicker="showPicker.retTime" @choose="chooseTime" @time="getTime"/>

    <number-input type="number" :validate="formValidate.number" :showPicker="showPicker.number" @choose="chooseNumber" @number="getNumber"/>

    <price-input type="price" :validate="formValidate.price" :showPicker="showPicker.price" @choose="choosePrice" @number="getPrice"/>

    <phone-input type="phone" :validate="formValidate.phone" @number="getPhone"/>

    <!--<button @click="submit()">点我</button>-->
  </view>
</template>

<script>
  import ChooseInput from './components/ChooseInput'
  import TimeInput from './components/TimeInput'
  import NumberInput from './components/NumberInput'
  import PriceInput from './components/PriceInput'
  import PhoneInput from './components/PhoneInput'

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
          dest: false,
          time: false,
          retTime: false,
          number: false,
          price: false
        },
        showPicker: {
          time: false,
          retTime: false,
          number: false,
          price: false
        }
      }
    },
    components: {
      ChooseInput,
      TimeInput,
      NumberInput,
      PriceInput,
      PhoneInput
    },
    methods: {
      submit () {
        // this.formValidate.origin = true
      },
      chooseTime (type) {
        console.log('-----------', type)
        if (type === 'time') {
          if (this.showPicker.retTime) {
            this.showPicker.retTime = false
          }
          this.showPicker.time = !this.showPicker.time
        }
        if (type === 'retTime') {
          if (this.showPicker.time) {
            this.showPicker.time = false
          }
          this.showPicker.retTime = !this.showPicker.retTime
        }
      },
      getTime (time) {
        console.log(time)
      },
      chooseNumber (type) {
        console.log('-----------', type)
        if (type === 'number') {
          this.showPicker.number = !this.showPicker.number
        }
      },
      getNumber (number) {
        console.log(number)
      },
      choosePrice (type) {
        console.log('-----------', type)
        if (type === 'price') {
          this.showPicker.price = !this.showPicker.price
        }
      },
      getPrice (price) {
        console.log(price)
      },
      getPhone (phone) {
        console.log(phone)
      }
    },
    onShow () {
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
