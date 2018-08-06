const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util; //工具手柄
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //微信快捷登录
  getLogin:function(e){
    console.log(e)
    var userInfo = JSON.parse(e.detail.rawData);
    wx.setStorageSync('userInfo', userInfo)
    util.doLogin(function (res) {
      console.log("============登录返回的信息:", res)
      //设置uid 和 token 缓存
      wx.setStorageSync("uid", res.data.data.uid);
      wx.setStorageSync("token", res.data.data.token);
      //设置全局的uid
      app.globalData.uid = res.data.data.uid;
        // app.globalData.uid = 342424,
      // var pages = getCurrentPages() //获取加载的页面
      // console.log(pages)
      // console.log(pages[0].route)
      wx.navigateTo({
        url:"/pages/nearby/nearby"
      })
    });
  }
})