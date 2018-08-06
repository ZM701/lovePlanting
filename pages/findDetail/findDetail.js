var app = getApp(); 
var page = 1;
var list = [];
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getSearchPlant = tool.configApi.getSearchPlant;  //通用-搜索识别相关信息 列表
Page({
  data: {
    note: [],  //数据列表
    name:"",  //关键字 植物的名字
  },
  //跳转到附近（地图）详情页
  nearbyDetails:function(e){
    console.log(e);   
    wx.navigateTo({
      url: '../nearbyDetails/nearbyDetails?recognitionid=' + e.currentTarget.dataset.recognitionid + '&longitude=' + e.currentTarget.dataset.longitude + '&latitude=' + e.currentTarget.dataset.latitude
    })
  },
  //通用-搜索识别相关信息 列表
  getSearchPlant: function (page) {
    var that = this;
    var suCb = function (res) {
      list = list.concat(res.data.content);
      that.setData({
        note : list
      })
      console.log(that.data.note)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      keywords: that.data.name,
      page: page,
      size:20
    };
    var palyParam = {
      url: getSearchPlant,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  onLoad: function (options){
    this.setData({
      name: options.name
    })
   // console.log(this.data.name)
  },
  
  //调用
  onReady: function () {
    page = 1;
    list = [];
    this.getSearchPlant(1);
  },
  onReachBottom: function () {  
    page = page + 1;
    this.getSearchPlant(page);
  },
  //跳转到生成足迹
  generateFoot:function(){
    wx.navigateTo({
      url: '../generateFoot/generateFoot',
    })
  }

 
})