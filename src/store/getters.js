const getters = {
  avatar: state => state.user.avatar,
  gender: state => state.user.gender,
  nickName: state => state.user.nickName,
  token: state => state.user.token,
  admin: state => state.user.admin,
  switches: state => state.app.switches,
  pageSize: state => state.app.pageSize,
  shareImg: state => state.app.shareImg,
  swiper: state => state.app.swiper
}

export default getters
