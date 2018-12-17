<template>

  <view id="admin">

    <view class="cells cell add-switch">
      <view class="content">
        <view class="label">添加行程</view>
        <view class="operate">
          <switch :checked="switches.add" @change="addSwitch" color="#76ABEF"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary" @click="update('SwitchAdd', switches.add)">提交</button>
      </view>
    </view>
    <view class="cells cell call-phone-switch">
      <view class="content">
        <view class="label">拨打电话</view>
        <view class="operate">
          <switch :checked="switches.callPhone" @change="callPhoneSwitch" color="#76ABEF"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary" @click="update('SwitchCallPhone', switches.callPhone)">提交</button>
      </view>
    </view>
    <view class="cells cell page-size-index">
      <view class="content">
        <view class="label">首页显示</view>
        <view class="operate">
          <input type="number" placeholder="条数" v-model="pageSize.index"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary" @click="update('PageSizeIndex', pageSize.index)">提交</button>
      </view>
    </view>
    <view class="cells cell page-size-list">
      <view class="content">
        <view class="label">列表页显示</view>
        <view class="operate">
          <input type="number" placeholder="条数" v-model="pageSize.list"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary" @click="update('PageSizeList', pageSize.list)">提交</button>
      </view>
    </view>
    <view class="cells cell-area share-img-index">
      <form @submit="submitTextarea">
        <view class="content">
          <view class="label">首页分享图</view>
          <view class="btn">
            <button class="submit" form-type="submit" type="primary">提交</button>
          </view>
        </view>
        <textarea class="textarea" auto-height placeholder="首页分享图" name="shareImgIndex" :value="shareImg.index"/>
      </form>
    </view>
    <view class="cells cell-area share-text-index">
      <form @submit="submitTextarea">
        <view class="content">
          <view class="label">首页分享文案</view>
          <view class="btn">
            <button class="submit" form-type="submit" type="primary">提交</button>
          </view>
        </view>
        <textarea class="textarea" auto-height placeholder="首页分享文案" name="shareTextIndex" :value="shareText.index"/>
      </form>
    </view>
    <view class="cells cell-area share-img-detail">
      <form @submit="submitTextarea">
        <view class="content">
          <view class="label">详情页分享图</view>
          <view class="btn">
            <button class="submit" form-type="submit" type="primary">提交</button>
          </view>
        </view>
        <textarea class="textarea" auto-height placeholder="详情页分享图" name="shareImgDetail" :value="shareImg.detail"/>
      </form>
    </view>
    <view class="cells cell-area share-text-detail">
      <form @submit="submitTextarea">
        <view class="content">
          <view class="label">详情页分享文案</view>
          <view class="btn">
            <button class="submit" form-type="submit" type="primary">提交</button>
          </view>
        </view>
        <textarea class="textarea" auto-height placeholder="详情页分享文案" name="shareTextDetail" :value="shareText.detail"/>
      </form>
    </view>
    <button @click="refreshConfig()" type="primary">刷新</button>
  </view>

</template>

<script>
  import { getConfig, authAdmin } from '@/api/config'
  export default {
    data () {
      return {
        switches: {
          add: '',
          callPhone: ''
        },
        pageSize: {
          index: '',
          list: ''
        },
        shareImg: {
          index: '',
          detail: ''
        },
        shareText: {
          index: '',
          detail: ''
        }
      }
    },
    methods: {
      addSwitch (e) {
        this.switches.add = e.mp.detail.value
      },
      callPhoneSwitch (e) {
        this.switches.callPhone = e.mp.detail.value
      },
      getConfig () {
        getConfig().then(res => {
          this.switches.add = !!parseInt(res.data.SWITCH.SwitchAdd)
          this.switches.callPhone = !!parseInt(res.data.SWITCH.SwitchCallPhone)
          this.pageSize.index = parseInt(res.data.PAGE_SIZE.PageSizeIndex)
          this.pageSize.list = parseInt(res.data.PAGE_SIZE.PageSizeList)
          this.shareImg.index = res.data.SHARE_IMG.ShareImgIndex
          this.shareImg.detail = res.data.SHARE_IMG.ShareImgDetail
          this.shareText.index = res.data.SHARE_TEXT.ShareTextIndex
          this.shareText.detail = res.data.SHARE_TEXT.ShareTextDetail
        }).catch(error => {
          console.log(error)
        })
      },
      refreshConfig () {
        this.$store.dispatch('RefreshConfig').then(res => {
          this.showToast(res.meta.code, res.meta.msg)
        }).catch(error => {
          console.log(error)
        })
      },
      update (key, value) {
        if ((typeof value) === 'boolean') {
          value = value === true ? 1 : 0
        }
        if (key === 'ShareTextIndex') {
          value = this.shareText.index
        }
        const data = {
          key,
          value
        }
        this.$store.dispatch('UpdateConfig', data).then(res => {
          this.showToast(res.meta.code, res.meta.msg)
        }).catch(error => {
          console.log(error)
        })
      },
      submitTextarea (e) {
        const value = e.mp.detail.value
        if (value.shareImgIndex) {
          this.update('ShareImgIndex', value.shareImgIndex)
        }
        if (value.shareTextIndex) {
          this.update('ShareTextIndex', value.shareTextIndex)
        }
        if (value.shareImgDetail) {
          this.update('ShareImgDetail', value.shareImgDetail)
        }
        if (value.shareTextDetail) {
          this.update('ShareTextDetail', value.shareTextDetail)
        }
      },
      wxAuth () {
        const self = this
        wx.login({
          success (loginRes) {
            if (loginRes.code) {
              authAdmin(loginRes.code).then(res => {
                if (res.data) {
                  self.getConfig()
                } else {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            } else {
              console.log('登录失败！' + loginRes.errMsg)
            }
          }
        })
      },
      showToast (code, msg) {
        if (code === 2000) {
          wx.showToast({
            title: msg,
            icon: 'success',
            duration: 1300
          })
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 1300
          })
        }
      }
    },
    computed: {
    },
    onLoad () {
      this.wxAuth()
    },
    onUnload () {
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  #admin {
    width: 100%;
    margin-bottom: 30rpx;
  }
  .cell {
    @include height-rpx-width-100(100);
    @include justify-start-align-center;
    background: $white;
    .content {
      @include height-rpx-width-percent(100, 80%);
      @include justify-space-between-align-center;
      .label {
        @include height-width-percent-text(100, 60%, left);
      }
      .operate {
        @include height-rpx-width-percent(100, 40%);
        @include justify-end-align-center;
        switch {
          padding-right: 10rpx;
        }
        input {
          @include height-width-100-text(100, right);
          padding-right: 20rpx;
        }
      }
    }
  }
  .cell-area {
    width: 100%;
    @include justify-align-center;
    @include border-top-bottom-width(1);
    background: $white;
    form {
      width: 100%;
      .content {
        width: 100%;
        @include justify-space-between-align-center;
        .label {
          @include height-width-percent-text(99, 80%, left);
          @include border-bottom-width(1);
        }
      }
      .textarea {
        width: calc(100% - 15rpx);;
        min-height: 120rpx;
        padding-left: 15rpx;
        @include border-bottom-width(1);
        background: $white;
      }
    }
  }
  .cells {
    margin-bottom: 10rpx;
    .label {
      text-indent: 10rpx;
      color: $unimpColor;
    }
    .btn {
      @include height-rpx-width-percent(100, 20%);
      .submit {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        text-decoration: none;
        line-height: 100rpx;
        border-radius: 0;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
      }
    }
  }
</style>
