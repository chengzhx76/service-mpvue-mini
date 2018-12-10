import { getConfig, updateConfig, refreshConfig } from '@/api/config'

function setMutations (commit, data) {
  commit('SET_SWITCH', data.SWITCH.SwitchAdd)
  commit('SET_PAGE_SIZE', { index: data.PAGE_SIZE.PageSizeIndex, list: data.PAGE_SIZE.PageSizeList })
  commit('SET_SHARE_IMG', data.SHARE_IMG.ShareImgIndex)
  commit('SET_SHARE_TEXT', data.SHARE_TEXT.ShareTextIndex)
  commit('SET_INDEX_SWIPER', data.SWIPER)
}

const app = {
  state: {
    switches: {
      add: true
    },
    pageSize: {
      index: 6,
      list: 10
    },
    shareImg: {
      index: 'https://chengzhx76.picp.vip/index-share.jpg'
    },
    shareText: {
      index: '推荐成武拼车，快来试试~'
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
      state.switches.add = !!parseInt(add)
    },
    SET_PAGE_SIZE: (state, { index, list }) => {
      state.pageSize.index = index
      state.pageSize.list = list
    },
    SET_SHARE_IMG: (state, img) => {
      state.shareImg.index = img
    },
    SET_SHARE_TEXT: (state, text) => {
      state.shareText.index = text
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
