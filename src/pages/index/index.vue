<template>
  <view id="index">

    <view class="main">
      <view class="section-swiper">
        <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
                :vertical="vertical" :interval="interval" :duration="duration">
          <swiper-item v-for="item in imgs" :key="item.id">
            <view class="swiper-item">
              <image class="swiper-img" :src="item.src"/>
            </view>
          </swiper-item>
        </swiper>
      </view>


    </view>
    <view class="add">



    </view>

    <button @click="handler">BTN</button>
    <text class="fa fa-paper-plane-o"></text>
    <text class="fa fa-paper-plane-o" aria-hidden="true"></text>
  </view>
</template>

<script>

export default {
  data () {
    return {
      imgs: [
        {
          id: '1',
          src: 'https://dummyimage.com/320x150/4A7BF7&text=Hello'
        },
        {
          id: '2',
          src: 'https://dummyimage.com/320x150/4A7BF7&text=Hello'
        }
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      circular: false,
      interval: 2000,
      duration: 500
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
