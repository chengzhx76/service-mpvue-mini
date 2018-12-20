<template>
  <view id="card">
    <view class="card" @click="detail(travel.id)" v-for="(travel, index) in travels" :key="travel.id" hover-class="choose-hover">
      <view class="header">
        <view :class="[travel.type === 2 ? 'driver' : 'passenger', 'nav-block']"></view>
        <view class="nav-info">
          <view class="tag">{{ travel.type === 2 ? '车找人' : '人找车'}}</view>
          <view class="seats" v-if="travel.type === 2">剩余{{ travel.num }}座</view>
          <view class="seats" v-if="travel.type === 1">{{ travel.num }}人</view>
        </view>
      </view>
      <view class="content">
        <view class="left">
          <view class="start address">
            <view class="icon">
              <view class="nav">起</view>
            </view>
            <text class="text">{{ travel.origin }}</text>
          </view>
          <view class="road address" v-if="!!travel.via">
            <view class="icon">
              <view class="nav">经</view>
            </view>
            <text class="text">{{ travel.via }}</text>
          </view>
          <view class="end address">
            <view class="icon">
              <view class="nav">终</view>
            </view>
            <text class="text">{{ travel.dest }}</text>
          </view>
          <view class="time address">
            <view class="icon">
              <view class="nav">时</view>
            </view>
            <text class="text">{{ travel.time }}</text>
          </view>
        </view>
        <view class="right">
          <view class="summary">
            <view class="price" v-if="travel.price !== '-1'">
              <text class="money">{{ travel.price }}</text>
              <text class="unit">/人</text>
            </view>
            <view class="price" v-else>
              <text class="money">面议</text>
            </view>
            <view class="note">{{ travel.distTime }}</view>
          </view>
          <view class="share">
            <view class="icon" hover-class="btn-hover" @click.stop="chooseShare(travel)">
              <text class="fa blue-icon fa-sm fa-share-alt"/>
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <button class="call-phone" size="mini" hover-class="btn-hover" @click.stop="phoneCall(travel.mobileNo)">联系TA</button>
      </view>
    </view>
    <action-sheet ref="actionSheet" @shareImg="createShareImg"></action-sheet>
    <share-img ref="shareImgCom"></share-img>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { errorToast } from '@/utils/index'
  import ActionSheet from '@/components/ActionSheet/index'
  import ShareImg from '@/components/ShareImg/index'
  export default {
    props: {
      travels: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data () {
      return {
        tempTravel: null
      }
    },
    components: {
      ActionSheet,
      ShareImg
    },
    methods: {
      detail (id) {
        const url = `../detail/main?tid=${id}`
        wx.navigateTo({ url })
      },
      phoneCall (phone) {
        if (!this.freeze) {
          if (this.switches.callPhone) {
            wx.makePhoneCall({
              phoneNumber: phone
            })
          } else {
            errorToast('暂时不可用')
          }
        } else {
          errorToast('帐号冻结不能操作')
        }
      },
      chooseShare (item) {
        this.tempTravel = item
        this.$refs.actionSheet.showActionSheet()
      },
      createShareImg () {
        this.$refs.shareImgCom.createShareImg(this.tempTravel)
      }
    },
    computed: {
      ...mapGetters([
        'switches',
        'freeze'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #card {
    width: 100%;
  }
  .card {
    width: 98%;
    height: 360rpx;
    margin-left: 1%;
    @include border-radius-top(10);
    @include border-radius-bottom(10);
    @include justify-align-center;
    margin-top: 15rpx;
    background: $white;
    @include box-shadow;
    &:nth-last-child(3) {
      @include border-radius-bottom(0);
      .footer {
        @include border-radius-bottom(0);
      }
    }
    .header {
      @include height-rpx-width-100(60);
      display: flex;
      @include border-radius-top(10);
      background: $cardHeaderBgColor;
      .nav-block {
        @include height-width(35, 10);
        @include border-radius(8);
        margin-top: 15rpx;
        margin-left: 15rpx;
      }
      .passenger {
        background: $dark-yellow;
      }
      .driver {
        background: $dark-blue;
      }
      .nav-info {
        margin-top: 15rpx;
        height: 35rpx;
        display: flex;
        .tag {
          height: 35rpx;
          font-size: 30rpx;
          line-height: 36rpx;
          padding-right: 20rpx;
          padding-left: 12rpx;
        }
        .seats {
          height: 25rpx;
          font-size: 24rpx;
          color: $cardHeaderSummaryColor;
          line-height: 25rpx;
          text-indent: 15rpx;
          margin-top: 5rpx;
          border-left: 4rpx solid $cardHeaderSummaryColor;
        }
      }
    }
    .content {
      @include height-rpx-width-100(230);
      @include justify-start-align-center;
      .left {
        @include height-rpx-width-percent(230, 72%);
        @include justify-align-center;
        .address {
          @include height-rpx-width-100(65);
          @include justify-start-align-center;
          .icon {
            @include height-rpx-width-percent(65, 10%);
            @include justify-align-center;
            .nav {
              @include height-width-text-center(30, 30);
              font-size: 20rpx;
              color: $white;
              @include border-radius-percent(50%);
            }
          }
          .text {
            @include height-rpx-width-percent(65, 90%);
            @include over-hidden;
            font-size: 32rpx;
            line-height: 60rpx;
            text-indent: 5rpx;
          }
        }
        .start {
          .icon {
            .nav {
              background: $startColor;
            }
          }
          .text {
            font-size: 36rpx;
          }
        }
        .road {
          height: 50rpx;
          .icon {
            .nav {
              background: $roadColor;
            }
          }
          .text {
            color: $roadColor;
            font-size: 28rpx;
          }
        }
        .end {
          .icon {
            .nav {
              background: $endColor;
            }
          }
          .text {
            font-size: 36rpx;
          }
        }
        .time {
          height: 50rpx;
          color: $timeColor;
          .icon {
            .nav {
              background: $timeColor;
            }
          }
          .text {
            font-size: 28rpx;
          }
        }
      }
      .right {
        @include height-rpx-width-percent(230, 28%);
        .summary {
          height: 100rpx;
          font-size: 28rpx;
          padding-right: 20rpx;
          .price {
            @include height-text(40, right);
            color: $priceColor;
            .money {
              font-size: 34rpx;
            }
          }
          .note {
            @include height-text(40, right);
            color: $unimpColor;
          }
        }
        .share {
          @include height-rpx-width-100(130);
          @include justify-align-center;
          .icon {
            @include height-width-line-height-text-center(50, 80, 47);
            @include border-radius(50);
            background: $cardShareColor;
          }
        }

      }
    }
    .footer {
      @include height-rpx-width-100(70);
      @include justify-end;
      padding-top: 10rpx;
      @include border-radius-bottom(10);
      @include border-top-width(1);
      .call-phone {
        height: 50rpx;
        font-size: 32rpx;
        line-height: 50rpx;
        color: $cardBtnFontColor;
        padding: 0 15rpx;
        margin-right: 15rpx;
      }
    }
  }
</style>
