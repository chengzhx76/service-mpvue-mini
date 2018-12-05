<template>

  <view id="admin">

    <view class="cell add-switch">
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
    <view class="cell page-size-index">
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

    <view class="cell page-size-list">
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
    <view class="cell share-img-index">
      <view class="content">
        <view class="label">首页分享图</view>
        <view class="operate">
          <input type="number" placeholder="url" v-model="shareImg.index"/>
        </view>
      </view>
      <view class="btn">
        <button class="submit" type="primary" @click="update('ShareImgIndex', shareImg.index)">提交</button>
      </view>
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
          add: ''
        },
        pageSize: {
          index: '',
          list: ''
        },
        shareImg: {
          index: ''
        }
      }
    },
    methods: {
      addSwitch (e) {
        this.switches.add = e.mp.detail.value
      },
      getConfig () {
        getConfig().then(res => {
          this.switches.add = !!parseInt(res.data.SWITCH.SwitchAdd)
          this.pageSize.index = parseInt(res.data.PAGE_SIZE.PageSizeIndex)
          this.pageSize.list = parseInt(res.data.PAGE_SIZE.PageSizeList)
          this.shareImg.index = res.data.SHARE_IMG.ShareImgIndex
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
        console.log(value)
        console.log(value === true)
        const data = {
          key,
          value: value === true ? 1 : 0
        }
        this.$store.dispatch('UpdateConfig', data).then(res => {
          console.log(res)
          this.showToast(res.meta.code, res.meta.msg)
        }).catch(error => {
          console.log(error)
        })
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
    @include height-width-100;
  }
  .cell {
    @include height-rpx-width-100(100);
    @include border-top-bottom-width(1);
    @include justify-start-align-center;
    margin-bottom: 10rpx;
    background: $white;
    .content {
      @include height-rpx-width-percent(100, 80%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        height: 100rpx;
        width: 280rpx;
        padding-right: 10rpx;
        line-height: 100rpx;
        padding-left: 15rpx;
      }
      .operate {
        switch {
          margin-right: 20rpx;
        }
        input {
          height: 100rpx;
          line-height: 100rpx;
          text-align: right;
          padding-right: 30rpx;
        }
      }
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
