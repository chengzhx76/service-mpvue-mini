import { getConfig } from '@/api/api'

const app = {
  state: {
    switch: {
      add: true,
    },
    pageNum: {
      index: 6,
      list: 10,
    },
    shareImg: {
      index: ''
    },
    swiper: {
      imgs: [],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      circular: false,
      interval: 10000,
      duration: 500
    }
  },
  mutations: {
    SET_SWITCH: (state, { add }) => {
      state.switch.add = add
    },
    SET_PAGE_NUM: (state, { index, list }) => {
      state.pageNum.index = index
      state.pageNum.list = list
    },
    SET_SHARE_IMG: (state, index) => {
      state.shareImg.index = index
    },
    SET_INDEX_SWIPER: (state, { imgs, indicatorDots, vertical, autoplay, circular, interval, duration }) => {
      state.swiper.imgs = imgs
      state.swiper.indicatorDots = indicatorDots
      state.swiper.vertical = vertical
      state.swiper.autoplay = autoplay
      state.swiper.circular = circular
      state.swiper.interval = interval
      state.swiper.duration = duration
    }
  },
  actions: {
    getConfig ({ commit }, code) {
      return new Promise((resolve, reject) => {
        getConfig().then(res => {
          commit('SET_TOKEN', res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
