import { getConfig, updateConfig, refreshConfig } from '@/api/config'

const app = {
  state: {
    switch: {
      add: true,
    },
    pageSize: {
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
    SET_SWITCH: (state, add) => {
      state.switch.add = add
    },
    SET_PAGE_SIZE: (state, { index, list }) => {
      state.pageSize.index = index
      state.pageSize.list = list
    },
    SET_SHARE_IMG: (state, index) => {
      state.shareImg.index = index
    },
    SET_INDEX_SWIPER: (state, { imgs, indicatorDots, vertical, autoplay, circular, interval, duration }) => {
      state.swiper.imgs = imgs
      state.swiper.indicatorDots = !!indicatorDots
      state.swiper.vertical = !!vertical
      state.swiper.autoplay = !!autoplay
      state.swiper.circular = !!circular
      state.swiper.interval = interval
      state.swiper.duration = duration
    }
  },
  actions: {
    getConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getConfig().then(res => {
          commit('SET_SWITCH', res.data.SWITCH.SwitchAdd)
          commit('SET_PAGE_SIZE', { index: res.data.PAGE_SIZE.PageSizeIndex, list: res.data.PAGE_SIZE.PageSizeList })
          commit('SET_SHARE_IMG', res.data.SHARE_IMG.ShareImgIndex)
          const imgs = res.data.SWIPER.SwiperShowImg
          const indicatorDots = res.data.SWIPER.SwiperIndicatorDots
          const vertical = res.data.SWIPER.SwiperVertical
          const autoplay = res.data.SWIPER.SwiperAutoplay
          const circular = res.data.SWIPER.SwiperCircular
          const interval = res.data.SWIPER.SwiperInterval
          const duration = res.data.SWIPER.SwiperDuration
          commit('SET_INDEX_SWIPER', { imgs, indicatorDots, vertical, autoplay, circular, interval, duration })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateConfig ({ commit }, { key, value }) {
      return new Promise((resolve, reject) => {
        updateConfig(key, value).then(res => {
          commit('SET_SWITCH', res.data.SWITCH.SwitchAdd)
          commit('SET_PAGE_SIZE', { index: res.data.PAGE_SIZE.PageSizeIndex, list: res.data.PAGE_SIZE.PageSizeList })
          commit('SET_SHARE_IMG', res.data.SHARE_IMG.ShareImgIndex)
          const imgs = res.data.SWIPER.SwiperShowImg
          const indicatorDots = res.data.SWIPER.SwiperIndicatorDots
          const vertical = res.data.SWIPER.SwiperVertical
          const autoplay = res.data.SWIPER.SwiperAutoplay
          const circular = res.data.SWIPER.SwiperCircular
          const interval = res.data.SWIPER.SwiperInterval
          const duration = res.data.SWIPER.SwiperDuration
          commit('SET_INDEX_SWIPER', { imgs, indicatorDots, vertical, autoplay, circular, interval, duration })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    refreshConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        refreshConfig().then(res => {
          commit('SET_SWITCH', res.data.SWITCH.SwitchAdd)
          commit('SET_PAGE_SIZE', { index: res.data.PAGE_SIZE.PageSizeIndex, list: res.data.PAGE_SIZE.PageSizeList })
          commit('SET_SHARE_IMG', res.data.SHARE_IMG.ShareImgIndex)
          const imgs = res.data.SWIPER.SwiperShowImg
          const indicatorDots = res.data.SWIPER.SwiperIndicatorDots
          const vertical = res.data.SWIPER.SwiperVertical
          const autoplay = res.data.SWIPER.SwiperAutoplay
          const circular = res.data.SWIPER.SwiperCircular
          const interval = res.data.SWIPER.SwiperInterval
          const duration = res.data.SWIPER.SwiperDuration
          commit('SET_INDEX_SWIPER', { imgs, indicatorDots, vertical, autoplay, circular, interval, duration })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
