<template>
  <view id="list">
    <view class="nav-main">
      <view class="nav">
        <view v-for="(tab, index) in tabs" :key="index"
              :class="[tab.class, {active: tab.isActive}, 'btn']"
              @click="tabsSwitch(tab.class, tab.type)"
              hover-class="tab-hover">{{ tab.name }}</view>
      </view>
      <view class="filter" hover-class="tab-hover" @click="filterHandler()">筛选</view>
    </view>
    <scroll-view scroll-y class="list" :style="{height: listHeight}" @scroll="scroll">

      <view class="refresh" v-if="show">{{ text }}</view>
      <view :style="{height: blockHeight + 'rpx'}"></view>

      <card-list :travels="list" @shareImgUrl="getShareImgUrl" @cancelActionSheet="cancelActionSheet"/>

      <view class="bottom-block" v-if="switches.add" hover-class="btn-hover" @click="bottomHandler">{{ bottomText }}</view>
      <view class="block"></view>
    </scroll-view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CardList from '@/components/CardList/index'
  import { list } from '@/api/api'
  import { formatTime, formatDateTime } from '@/utils/index'

  export default {
    components: {
      CardList
    },

    data () {
      return {
        listHeight: '370rpx',
        tabs: [
          {
            name: '全部',
            class: 'all',
            type: 0,
            isActive: true
          },
          {
            name: '乘客',
            class: 'passenger',
            type: 1,
            isActive: false
          },
          {
            name: '车主',
            class: 'driver',
            type: 2,
            isActive: false
          }
        ],
        list: [],
        service: {
          type: 0,
          origin: '',
          dest: '',
          time: '',
          number: ''
        },
        page: {
          pageNum: 1,
          totalNum: 0,
          hasMore: true
        },
        bottomText: '查看更多 >',
        blockHeight: 0,
        preScrollTop: 0,
        show: false,
        loading: false,
        text: '下拉加载~~~',
        imageUrl: '',
        tid: ''
      }
    },
    methods: {
      tabsSwitch (clazz, type) {
        this.service.type = type === 0 ? 0 : type === 1 ? 2 : 1
        this.getList()
        this.tabs.forEach(tab => {
          tab.isActive = clazz === tab.class
        })
      },
      getList () {
        list(this.service, this.page, this.pageSize.list).then(res => {
          this.list = res.data.list.map(item => {
            item['distTime'] = formatTime(item.time)
            item.time = formatDateTime(item.time)
            return item
          })
          if (res.data.pageNum * res.data.pageSize >= res.data.totalNum) {
            this.page.hasMore = false
            this.bottomText = '没有找到，发布一个 >'
          }
        })
      },
      filterHandler () {
        const url = '../filter/main'
        wx.navigateTo({ url })
      },
      scroll (e) {
        let scrollTop = e.mp.detail.scrollTop
        // 说明是在下拉
        if (scrollTop < 0 && scrollTop < this.preScrollTop) {
          if (!this.loading) {
            this.loading = true
            this.text = '加载中~~~'
            this.show = true
            this.blockHeight = 60
            setTimeout(() => {
              list(this.service, this.page, this.pageSize.list).then(res => {
                this.list = res.data.list.map(item => {
                  item['distTime'] = formatTime(item.time)
                  item.time = formatDateTime(item.time)
                  return item
                })
                this.text = '加载完成~~~'
                setTimeout(() => {
                  this.loading = false
                  this.blockHeight = 0
                  this.show = false
                  this.text = '下拉加载~~~'
                }, 1500)
              })
            }, 500)
          }
        }
        this.preScrollTop = scrollTop
      },

      bottomHandler () {
        if (this.page.hasMore) {
          this.loadMore()
        } else {
          this.addHandler()
        }
      },
      addHandler () {
        const url = '../add/main'
        wx.navigateTo({ url })
      },
      loadMore () {
        list(this.service, this.page, this.pageSize.list).then(res => {
          const newList = res.data.list.map(item => {
            item['distTime'] = formatTime(item.time)
            item.time = formatDateTime(item.time)
            return item
          })
          newList.forEach(item => {
            this.list.splice(this.list.length, 0, item)
          })
          console.log(res.data.pageNum * res.data.pageSize)
          console.log(res.data.totalNum)
          if (res.data.pageNum * res.data.pageSize >= res.data.totalNum) {
            this.page.hasMore = false
            this.bottomText = '没有找到，发布一个 >'
          }
        })
      },
      initFrom () {
        this.service.type = 0
        this.service.origin = ''
        this.service.dest = ''
        this.service.time = ''
        this.service.number = ''
        this.blockHeight = 0
        this.preScrollTop = 0
        this.show = false
        this.loading = false
        this.text = '下拉加载~~~'
        this.tabs = [
          {
            name: '全部',
            class: 'all',
            type: 0,
            isActive: true
          },
          {
            name: '乘客',
            class: 'passenger',
            type: 1,
            isActive: false
          },
          {
            name: '车主',
            class: 'driver',
            type: 2,
            isActive: false
          }
        ]
      },
      getShareImgUrl ({ url, tid }) {
        this.imageUrl = url
        this.tid = tid
      },
      cancelActionSheet () {
        this.imageUrl = ''
      }
    },
    computed: {
      ...mapGetters([
        'pageSize',
        'switches',
        'shareText',
        'shareImg'
      ])
    },
    onLoad () {
      Object.assign(this.$data, this.$options.data())
    },
    onUnload () {
      this.initFrom()
    },
    mounted () {
      const res = wx.getSystemInfoSync()
      const clientHeight = res.windowHeight
      const clientWidth = res.windowWidth
      const rpxR = 750 / clientWidth
      const height = clientHeight * rpxR - 90
      this.listHeight = `${height}rpx`
      // console.log(this.$root.$mp.query)
      const { origin, dest, type } = this.$root.$mp.query
      if (!!origin || !!dest || !!type) {
        this.service = {
          type: !parseInt(type) ? 0 : parseInt(type) === 1 ? 2 : 1,
          origin: origin,
          dest: dest
        }
        this.tabs.forEach(tab => {
          tab.isActive = parseInt(type) === tab.type
        })
        this.getList()
      }
    },
    onShow () {
      if (this.$mp.page.data && this.$mp.page.data.extend) {
        const { origin, dest, type, time, num } = this.$mp.page.data.extend
        this.service = {
          type: !parseInt(type) ? 0 : parseInt(type) === 1 ? 2 : 1,
          origin: origin,
          dest: dest,
          time: time,
          number: num
        }
        this.$mp.page.setData({
          extend: null
        })
        this.tabs.forEach(tab => {
          tab.isActive = parseInt(type) === tab.type
        })
      }
      this.getList()
    },
    onShareAppMessage (res) {
      return {
        title: this.imageUrl ? this.shareText.detail : this.shareText.index,
        path: `pages/index/main?tid=${this.tid}`,
        imageUrl: this.imageUrl ? this.imageUrl : this.shareImg.index
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
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

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .list {
    width: 100%;
    margin-top: 90rpx;
    .refresh {
      @include height-width-percent-lineHeight-text-center(60, 80);
      position: absolute;
      left: 0;
      top: 0;
      font-size: 32rpx;
      color: $refreshColor;
    }
  }

</style>
