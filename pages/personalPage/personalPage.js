// pages/personalPage/personalPage.js
const app = getApp();
var page = 1;
var list = [];
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getFoot = tool.configApi.getFoot,  //会员 - 获取会员发布足迹列表
  getPresonIdentify = tool.configApi.getPresonIdentify, // 鉴定 - 个人求鉴定列表
  getMembers = tool.configApi.getMembers;  //会员-会员信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    members: {}, //获取会员信息列表
    foot: [],//记录足迹列表
    footLength: 0, // 记录足迹个数
    uid:"",
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: options.uid
    })
    // console.log(options.uid)
  
  },
  //我的
  getMembers: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        members: res.data,
      })
      console.log(res)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: this.data.uid,
      myUid: app.globalData.uid
    };
    var palyParam = {
      url: getMembers,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  
  //记录足迹
  getFoot: function (page) {
    var that = this;
    var suCb = function (res) {

      for (var item of res.data.content) {
        item.month = item.createdAt.substr(5, 2)
        item.day = item.createdAt.substr(8, 2)
        var a = parseInt(item.month.charAt(0))
        if (a == 0) {
          item.month = parseInt(item.month.charAt(1))
        } else {
          item.month = parseInt(item.createdAt.substr(5, 2));
        }
      }

      list = list.concat(res.data.content);
      that.setData({
        foot: list,
        footLength: res.data.totalElements
      })
      // console.log(that.data.foot)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      // uid: 342424,
      uid: this.data.uid,
      page: page,
      size: 20
    };
    var palyParam = {
      url: getFoot,
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
    list = [];
    page = 1;
    this.getMembers();
    this.getFoot(1);
  
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
    page = page + 1;
    this.getFoot(page);
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //回到发现页面
  _back: function () {
    wx.reLaunch({
      url: '../articleDetail/articleDetail',
    })
  },
  //跳转到足迹详情页
  _footprintDetail(e){
    // console.log(e)
    wx.navigateTo({
      url: '../footprintDetail/footprintDetail?locationId=' + e.detail,
    })
  },
  //跳转到鉴别页面
  _identify(){
    wx.navigateTo({
      url: '../identify/identify?uid='+this.data.uid+'&pages=1',
    })
  }
})