<template>
  <view id="filter">
    <view class="input">
      <input placeholder-class="placeholder-color" placeholder="乘车时间" v-model="time"/>
    </view>
    <picker-view indicator-style="height: 30px;" style="width: 90%; height: 100px; background: darkcyan" :value="value" @change="bindChange">
      <picker-view-column>
        <view v-for="(day, index) in days" style="line-height: 30px; text-align: center" :key="index">{{ day }}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(time, index) in times" style="line-height: 30px; text-align: center" :key="index">{{ time }}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(minute, index) in minutes" style="line-height: 30px; text-align: center" :key="index">{{ minute }}</view>
      </picker-view-column>
    </picker-view>


  </view>
</template>

<script>
export default {
  data () {
    return {
      time: '10月12号（周六） 14:10',
      value: [0, 0, 1],
      days: [
        '11月08日 周四',
        '11月09日 周五',
        '11月10日 周六',
        '11月11日 周日',
        '11月12日 周一'
      ],
      times: [
        '14',
        '15',
        '16',
        '17',
        '18',
        '19'
      ],
      minutes: [
        '00',
        '15',
        '30',
        '45'
      ]
    }
  },
  computed: {
  },
  methods: {
    bindChange (e) {
      const val2 = e.mp.detail.value
      console.log(val2)
      console.log(this.value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";
  @import "@/styles/mixin.scss";

  #filter {
    @include height-width-100;
  }

  .input {
    height: 100rpx;
    background: $white;
    @include border(2);
    input {
      height: 100rpx;
      line-height: 100rpx;
      padding-left: 20rpx;
    }
  }

</style>
