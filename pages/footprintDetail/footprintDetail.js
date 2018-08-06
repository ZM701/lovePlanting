// pages/footprintDetail/footprintDetail.js
const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getLocationsDetail = tool.configApi.getLocationsDetail,  //通用-足迹详情
  getAttention = tool.configApi.getAttention,  //会员-关注
  getCancleAttention = tool.configApi.getCancleAttention;  //会员-取消关注

  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationId:0, //足迹id
    locationsInfo:{}, //足迹信息
    page:0,  //page=1 代表是生成足迹 
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)

    this.setData({
      locationId: options.locationId,
      page:options.page
    })
  },

  //通用-足迹详情
  getLocationsDetail: function () {
    var that = this;
    var suCb = function (res) {

      for (var item of res.data.recognitions) {
        item.month = item.createdAt.substr(5, 2);
        var a = parseInt(item.month.charAt(0))
        if (a == 0) {
          item.month = parseInt(item.month.charAt(1))
        } else {
          item.month = parseInt(item.createdAt.substr(5, 2));
        }

        //每年3月至5月划为春季，6月至8月划为夏季，9月至11月划为秋季，12月至下一年2月划为冬季

        if (item.month >= 3 && item.month <= 5) {
          item.season = "春"
        }
        else if (item.month >= 6 && item.month <= 8) {
          item.season = "夏"
        }
        else if (item.month >= 9 && item.month <= 11) {
          item.season = "秋"
        }
        else {
          item.season = "冬"
        }
      }


      that.setData({
        locationsInfo: res.data
      })
      console.log(that.data.locationsInfo)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      locationId: that.data.locationId,
      uid: app.globalData.uid
    };
    var palyParam = {
      url: getLocationsDetail,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //会员 - 关注
  getAttention: function () {
    var that = this;
    var suCb = function (res) {
      that.getLocationsDetail();
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.locationsInfo.uid,  //被关注者uid
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
  getCancleAttention: function () {
    var that = this;
    var suCb = function (res) {
      that.getLocationsDetail();
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.locationsInfo.uid,  //被关注者uid
      uid: app.globalData.uid  //登录用户uid
    };
    var palyParam = {
      url: getCancleAttention,
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
   this.getLocationsDetail()
  },
  //点击关注
  _attention: function () {
    this.getAttention();
  },
  //取消关注
  _cancleAttention: function () {
    this.getCancleAttention();
  },
  //跳转到生成我的足迹
  _generateFoot:function(){
    wx.navigateTo({
      url: '../generateFoot/generateFoot',
    })
  }

})