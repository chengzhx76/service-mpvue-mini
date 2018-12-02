const getters = {
  avatar: state => state.user.avatar,
  gender: state => state.user.gender,
  nickName: state => state.user.nickName,
  token: state => state.user.token
}

export default getters
