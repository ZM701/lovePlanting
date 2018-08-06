//app.js

App({
  onLaunch: function () {
    var that =this;
    that.checkLogin()
  },
  //全局变量
  globalData: {
    userInfo: null,
    index: 0
  },
  //  检查用户是否登录
  checkLogin: function () {
    var that = this;
    var uid = wx.getStorageSync('uid')
    if (uid) { //用户登录了
      console.log("登录了")
    } else { //用户没有登录
      wx.navigateTo({
        url: './pages/login/login',
      })
    }
  },
  globalData: {
    userInfo: null,
    uid: '',   //获取用户的uid
    longitude: '',   //获取用户的经度
    latitude: ''    //获取用户的纬度
  }
})