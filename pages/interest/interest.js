// pages/interest/interest.js
const app = getApp();
var page = 1; 
var list = [];
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getInterest = tool.configApi.getInterest,  //会员-感兴趣的人列表
  getAttention = tool.configApi.getAttention,  //会员-关注
  getCancleAttention = tool.configApi.getCancleAttention;  //会员-取消关注
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    interestInfo:[],  //赶兴趣的人的列表信息
    followingId:0,  //关注人的uid
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //会员 - 感兴趣的人的列表
  getInterest: function (page) {
    var that = this;
    var suCb = function (res) {
      list = list.concat(res.data.content)
      that.setData({
        interestInfo: list
      })
      // console.log(that.data.interestInfo)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      // uid: app.globalData.uid, 
      uid: app.globalData.uid,  //登录用户uid
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude,
      page: page,
      size:20

    };
    var palyParam = {
      url: getInterest,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //会员 - 关注
  getAttention: function (index) {
    var that = this;
    var suCb = function (res) {
      list.splice(index, 1)
      that.setData({
        interestInfo: list
      })
     that.getInterest(page);
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.followingId,  //被关注者uid
      uid: app.globalData.uid  //登录用户uid
    };
    var palyParam = {
      url: getAttention,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //会员-取消关注
  // getCancleAttention: function () {
  //   var that = this;
  //   var suCb = function (res) {
  //     that.getInterest();
  //   };
  //   var erCb = function (res) {
  //     console.log("失败")
  //   };
  //   var postData = {
  //     followingId: that.data.followingId,  //被关注者uid
  //     uid: app.globalData.uid  //登录用户uid
  //   };
  //   var palyParam = {
  //     url: getCancleAttention,
  //     method: "POST",
  //     data: postData,
  //     success: suCb,
  //     error: erCb,
  //   }
  //   util.request(palyParam);
  // },

  //点击关注
  attention: function (e) {
    this.setData({
      followingId: e.currentTarget.dataset.id
    })
    this.getAttention(e.currentTarget.dataset.index);
  },
  //取消关注
  // cancleAttention: function (e) {
  //   this.setData({
  //     followingId: e.currentTarget.dataset.id
  //   })
  //   this.getCancleAttention();
  // },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // list = [];
    // page = 1;
    this.getInterest(1);
  
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
      page = page + 1;
      this.getInterest(page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //点击头像跳转到个人主页
  personPage:function(e){
    wx.navigateTo({
      url: '../personalPage/personalPage?uid=' + e.currentTarget.dataset.uid,
    })
    // console.log(e.currentTarget.dataset.uid)
  }
})