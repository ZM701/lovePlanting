// pages/generateFoot/generateFoot.js 
const app = getApp();

var page = 1;
var list = [];
var tool = require('../../utils/tool.js'); 
var util = tool.util,//工具手柄
  getSaveFoot = tool.configApi.getSaveFoot,
  getHistory = tool.configApi.getHistory; //会员 - 获取会员识别历史列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flage:false, //生成足迹是否出现
    history:[], //选择图片
    checkedImages:[],  //被选中的图片
    recognitions:"", //选中图片的id
    input:"", //文本框的值
    text:"",  //文本域的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //识别历史
  getHistory: function (page) {
    var that = this;
    var suCb = function (res) {
      console.log(res)

      for (var item of res.data.content) {
        item.month = item.createdAt.substr(5, 2)
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

      list = list.concat(res.data.content)
      that.setData({
        history: list,
      })
      // console.log(that.data.history)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      // uid: 342424,
      page: page,
      size: 20,
      status:1,
    };
    var palyParam = {
      url: getHistory,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  }, 
  //生成足迹
  getSaveFoot: function () {
    var that = this;
    var suCb = function (res) {
      console.log(res.data.locationId)
      wx.navigateTo({
        // url: '../showFoot/showFoot?locationId=' + res.data.locationId,
        // url: '../footprintDetail/footprintDetail?locationId=' + res.data.locationId+'&page=1',
        url:'../mine/mine?currentTab=1'
      })

      
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      name: that.data.input,
      content:that.data.text,
      recognitions: that.data.recognitions
    };
    var palyParam = {
      url: getSaveFoot,
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
    this.getHistory(1);
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
    this.getHistory(page);
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //点击生成足迹
  btn:function(){
    if (this.data.checkedImages.length <= 0){
      wx.showToast({
        title: '至少选择一张图片',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (this.data.checkedImages.length > 10){
      wx.showToast({
        title: '只能选择十张图片哦',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    this.setData({
      flage: true,
    })
  },
  //点击取消
  cancle:function(){
    this.setData({
      flage: false
    })
  },
  //点击完成
  success:function(){
    if (this.data.input == ""){
      wx.showToast({
        title: '足迹名称不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    this.setData({
      flage: false
    })
    this.getSaveFoot();
  },
  //复选框事件
  checkboxChange: function (e) {
    var res = [];
    res = res.concat(e.detail.value)
    this.setData({
      checkedImages : res
    })
    this.setData({
      recognitions: this.data.checkedImages.join(",")
    })
  },
  //输入框事件
  input:function(e){
    this.setData({
      input: e.detail.value
    })
  },
  //文本域事件
  text:function(e){
    this.setData({
      text: e.detail.value
    })
  },


})