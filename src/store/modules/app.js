import { getConfig } from '@/api/api'

const app = {
  state: {
    addSwitch: true,
    indexPageNum: 6,
    listPageNum: 10,
    indexShareImg: '',
    indexSwiper: {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      circular: false,
      interval: 10000,
      duration: 500
    }
  },
  mutations: {
    SET_ADD_SWITCH: (state, addSwitch) => {
      state.addSwitch = addSwitch
    },
    SET_INDEX_PAGE_NUM: (state, indexPageNum) => {
      state.indexPageNum = indexPageNum
    },
    SET_LIST_PAGE_NUM: (state, listPageNum) => {
      state.listPageNum = listPageNum
    },
    SET_INDEX_SHARE_IMG: (state, indexShareImg) => {
      state.indexShareImg = indexShareImg
    },
    SET_INDEX_SWIPER: (state, { indicatorDots, vertical, autoplay, circular, interval, duration }) => {
      state.indexSwiper.indicatorDots = indicatorDots
      state.indexSwiper.vertical = vertical
      state.indexSwiper.autoplay = autoplay
      state.indexSwiper.circular = circular
      state.indexSwiper.interval = interval
      state.indexSwiper.duration = duration
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
