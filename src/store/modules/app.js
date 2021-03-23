import { getConfig, updateConfig, refreshConfig } from '@/api/config'

function setMutations (commit, data) {
  commit('SET_SWITCH', { add: data.SWITCH.SwitchAdd, callPhone: data.SWITCH.SwitchCallPhone })
  commit('SET_PAGE_SIZE', { index: data.PAGE_SIZE.PageSizeIndex, list: data.PAGE_SIZE.PageSizeList })
  commit('SET_SHARE_IMG', { index: data.SHARE_IMG.ShareImgIndex, detail: data.SHARE_IMG.ShareImgDetail })
  commit('SET_SHARE_TEXT', { index: data.SHARE_TEXT.ShareTextIndex, detail: data.SHARE_TEXT.ShareTextDetail })
  commit('SET_INDEX_SWIPER', data.SWIPER)
}

const app = {
  state: {
    switches: {
      add: true,
      callPhone: true
    },
    pageSize: {
      index: 6,
      list: 10
    },
    shareImg: {
      index: 'https://chengzhx76.cn/index-share.jpg',
      detail: 'https://chengzhx76.cn/share-bg.jpg'
    },
    shareText: {
      index: '推荐成武拼车，快来试试~',
      detail: '发布了新行程，快来看看吧~'
    },
    swiper: {
      imgs: [
        'https://chengzhx76.cn/1.png',
        'https://chengzhx76.cn/2.png'
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      circular: false,
      interval: 10000,
      duration: 500
    }
  },
  mutations: {
    SET_SWITCH: (state, { add, callPhone }) => {
      state.switches.add = !!parseInt(add)
      state.switches.callPhone = !!parseInt(callPhone)
    },
    SET_PAGE_SIZE: (state, { index, list }) => {
      state.pageSize.index = index
      state.pageSize.list = list
    },
    SET_SHARE_IMG: (state, { index, detail }) => {
      state.shareImg.index = index
      state.shareImg.detail = detail
    },
    SET_SHARE_TEXT: (state, { index, detail }) => {
      state.shareText.index = index
      state.shareText.detail = detail
    },
    SET_INDEX_SWIPER: (state, swiper) => {
      state.swiper.imgs = swiper.SwiperShowImg.map(item => {
        return item.SwiperShowImg
      })
      state.swiper.indicatorDots = !!parseInt(swiper.SwiperIndicatorDots)
      state.swiper.vertical = !!parseInt(swiper.SwiperVertical)
      state.swiper.autoplay = !!parseInt(swiper.SwiperAutoplay)
      state.swiper.circular = !!parseInt(swiper.SwiperCircular)
      state.swiper.interval = parseInt(swiper.SwiperInterval)
      state.swiper.duration = parseInt(swiper.SwiperDuration)
    }
  },
  actions: {
    GetConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getConfig().then(res => {
          setMutations(commit, res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateConfig ({ commit }, { key, value }) {
      return new Promise((resolve, reject) => {
        updateConfig(key, value).then(res => {
          setMutations(commit, res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    RefreshConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        refreshConfig().then(res => {
          setMutations(commit, res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
