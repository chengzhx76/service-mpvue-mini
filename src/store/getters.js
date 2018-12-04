const getters = {
  avatar: state => state.user.avatar,
  gender: state => state.user.gender,
  nickName: state => state.user.nickName,
  token: state => state.user.token,
  isAdmin: state => state.user.isAdmin,
  switchAdd: state => state.app.switch.add,
  pageSizeIndex: state => state.app.pageSize.index,
  pageSizeList: state => state.app.pageSize.list,
  shareImgIndex: state => state.app.shareImg.index,
  imgs: state => state.app.swiper.imgs,
  indicatorDots: state => state.app.swiper.indicatorDots,
  vertical: state => state.app.swiper.vertical,
  autoplay: state => state.app.swiper.autoplay,
  circular: state => state.app.swiper.circular,
  interval: state => state.app.swiper.interval,
  duration: state => state.app.swiper.duration
}

export default getters
