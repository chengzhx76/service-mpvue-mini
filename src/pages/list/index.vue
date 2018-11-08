<template>
  <view id="list">
    <view class="nav-main">
      <view class="nav">
        <view class="all btn active">全部</view>
        <view class="passenger btn">乘客</view>
        <view class="driver btn">车主</view>
      </view>
      <view class="filter">筛选</view>
    </view>
    <scroll-view scroll-y class="list" :style="{height: listHeight}">

      <view class="card">
        <view class="header">
          <view class="nav-block driver"></view>
          <view class="nav-info">
            <view class="tag">车找人</view>
            <view class="seats">剩余3位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="road address">
              <view class="icon">
                <view class="nav">经</view>
              </view>
              <text class="text">五岔路口</text>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">菏泽</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月12号（周日） 11:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">12</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">8小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="card">
        <view class="header">
          <view class="nav-block driver"></view>
          <view class="nav-info">
            <view class="tag">车找人</view>
            <view class="seats">剩余2位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">济南</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月15号（周一） 08:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">100</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">16小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="card">
        <view class="header">
          <view class="nav-block passenger"></view>
          <view class="nav-info">
            <view class="tag">人找车</view>
            <view class="seats">2人</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">商丘火车站</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月19号（周六） 08:00</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">80</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">16小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="card">
        <view class="header">
          <view class="nav-block driver"></view>
          <view class="nav-info">
            <view class="tag">车找人</view>
            <view class="seats">剩余3位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="road address">
              <view class="icon">
                <view class="nav">经</view>
              </view>
              <text class="text">五岔路口</text>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">菏泽</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月12号（周日） 11:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">12</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">8小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="card">
        <view class="header">
          <view class="nav-block driver"></view>
          <view class="nav-info">
            <view class="tag">车找人</view>
            <view class="seats">剩余2位座</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">济南</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月15号（周一） 08:12</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">100</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">16小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>
      <view class="card">
        <view class="header">
          <view class="nav-block passenger"></view>
          <view class="nav-info">
            <view class="tag">人找车</view>
            <view class="seats">2人</view>
          </view>
        </view>
        <view class="content">

          <view class="left">
            <view class="start address">
              <view class="icon">
                <view class="nav">起</view>
              </view>
              <view class="text">成武</view>
            </view>
            <view class="end address">
              <view class="icon">
                <view class="nav">终</view>
              </view>
              <view class="text">商丘火车站</view>
            </view>
            <view class="time address">
              <view class="icon">
                <view class="nav">时</view>
              </view>
              <view class="text">11月19号（周六） 08:00</view>
            </view>
          </view>

          <view class="right">
            <view class="summary">
              <view class="price">
                <text class="money">80</text>
                <text class="unit">/人</text>
              </view>
              <view class="note">16小时后出发</view>
            </view>
            <view class="share">
              <view class="icon">
                <text class="fa blue-icon fa-sm fa-share-alt"/>
              </view>
            </view>
          </view>
        </view>

        <view class="footer">
          <text class="call-phone">联系TA</text>
        </view>
      </view>

    </scroll-view>
  </view>
</template>

<script>
  export default {
    components: {
    },

    data () {
      return {
        listHeight: '370rpx'
      }
    },

    created () {
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      const height = clientHeight * rpxR - 90
      this.listHeight = `${height}rpx`
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @import "@/styles/card.scss";
  #list {
    @include height-width-100;
    @include column-align-center;
  }
  .nav-main {
    @include height-rpx-width-100(89);
    @include justify-space-between;
    @include border-bottom-width(1);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: $white;
    .nav {
      @include height-width(89, 300);
      display: flex;
      .btn {
        @include height-width-line-height-text-center(85, 100, 100);
        margin-left: 15rpx;
      }
      .active {
        width: 100rpx;
        @include border-bottom(4, $red)
      }
    }
    .filter {
      @include height-width-text-center(89, 140);
      color: $light-blue;
      font-size: 36rpx;
    }
  }

  .list {
    width: 100%;
    margin-top: 90rpx;
    @include justify-center;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
    .card {
      margin-left: 2%;
    }
  }


</style>
