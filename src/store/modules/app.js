import { getConfig, updateConfig, refreshConfig } from '@/api/config'

const app = {
  state: {
    switch: {
      add: true
    },
    pageSize: {
      index: 6,
      list: 10
    },
    shareImg: {
      index: 'https://chengzhx76.picp.vip/index-share.jpg'
    },
    swiper: {
      imgs: [
        'https://chengzhx76.picp.vip/1.jpg',
        'https://chengzhx76.picp.vip/2.jpg'
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
    SET_INDEX_SWIPER: (state, swiper) => {
      state.swiper.imgs = swiper.SwiperShowImg.map(item => {
        return item.SwiperShowImg
      })
      state.swiper.indicatorDots = !!swiper.SwiperIndicatorDots
      state.swiper.vertical = !!swiper.SwiperVertical
      state.swiper.autoplay = !!swiper.SwiperAutoplay
      state.swiper.circular = !!swiper.SwiperCircular
      state.swiper.interval = swiper.SwiperInterval
      state.swiper.duration = swiper.SwiperDuration
    }
  },
  actions: {
    getConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getConfig().then(res => {
          commit('SET_SWITCH', res.data.SWITCH.SwitchAdd)
          commit('SET_PAGE_SIZE', { index: res.data.PAGE_SIZE.PageSizeIndex, list: res.data.PAGE_SIZE.PageSizeList })
          commit('SET_SHARE_IMG', res.data.SHARE_IMG.ShareImgIndex)
          commit('SET_INDEX_SWIPER', res.data.SWIPER)
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
          commit('SET_INDEX_SWIPER', res.data.SWIPER)
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
          commit('SET_INDEX_SWIPER', res.data.SWIPER)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
