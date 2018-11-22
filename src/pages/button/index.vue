<template>
  <div id="button">
    <button class='btn' @click='test' hover-class='btn_hover'>确定</button>
  </div>
</template>

<script>

export default {
  methods: {
    test () {
      console.log('--------')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .btn {
    width: 90%;
    margin-top: 30rpx;
    background-color: #FFCC00;
    color: #FFF;
  }
  .btn::after {
    border: 0;
  }
  .btn_hover {
    background-color: pink;
  }

</style>
