// pages/personalSign/personalSign.js
const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getPresonInfo = tool.configApi.getPresonInfo;  //会员-会员信息



Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:null,
    content:'',
    bg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      types: options.type,
      content:options.content,
      bg:options.img,
    })
  },
  //签名
  getPresonInfo: function () {
    var that = this;
    var suCb = function (res) {
      console.log(res)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      bio: that.data.content,
      background:that.data.bg,
    };
    var palyParam = {
      url: getPresonInfo,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
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
  contentInput:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  primary:function(){
    // console.log(this.data.content)
    if(this.data.types==1){

    }
    if(this.data.types==2){
      wx.showToast({
        title: '保存成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      this.getPresonInfo()
    }
  }
})