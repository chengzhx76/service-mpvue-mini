const getters = {
  uid: state => state.user.uid,
  avatar: state => state.user.avatar,
  gender: state => state.user.gender,
  nickName: state => state.user.nickName,
  mobileNo: state => state.user.mobileNo,
  token: state => state.user.token,
  admin: state => state.user.admin,
  freeze: state => state.user.freeze,
  switches: state => state.app.switches,
  pageSize: state => state.app.pageSize,
  shareImg: state => state.app.shareImg,
  shareText: state => state.app.shareText,
  swiper: state => state.app.swiper
}

export default getters
