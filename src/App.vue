<script>
export default {
  methods: {
    wxLogin () {
      const self = this
      wx.login({
        success (loginRes) {
          if (loginRes.code) {
            wx.getSetting({
              success (settRes) {
                if (settRes.authSetting['scope.userInfo']) {
                  self.getWxUserInfo(loginRes.code)
                } else {
                  self.$store.dispatch('AuthUser', loginRes.code).then(() => {
                  }).catch(error => {
                    console.log(error)
                  })
                }
              }
            })
          } else {
            console.log('登录失败！' + loginRes.errMsg)
          }
        }
      })
    },
    loadConfig () {
      this.$store.dispatch('GetConfig').then(() => {
      }).catch(error => {
        console.log(error)
      })
    }
  },
  onLaunch (options) {
    this.loadConfig()
    this.wxLogin()
  },
  onError (msg) {
    console.warn('全局异常拦截->')
    console.warn(msg)
  }
}
</script>

<style>

</style>
