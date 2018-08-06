// pages/identify/identify.js
var footer = require("../../utils/util.js");
var page = 1;
var list = [];
var page1 = 1;
var list1 = [];
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getPresonIdentify = tool.configApi.getPresonIdentify, // 鉴定 - 个人求鉴定列表
  getIdentifications = tool.configApi.getIdentifications;  //鉴定 - 获取鉴定列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identifications:[],
    uid:0,
    pages:0,
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var array_pl2 = footer.array_pl2
    this.setData({
      array_pl2,
      uid:options.uid,
      pages:options.pages
    })

    //获取屏幕的相关信息 
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });

   
  
  },
  // 鉴定 - 获取鉴定列表
  getIdentifications: function (page) {
    var that = this;
    var suCb = function (res) {
      list = list.concat(res.data.content)
      that.setData({
        identifications: list
      })
     console.log(that.data.identifications)
    };
    var erCb = function (res) {
      console.log("失败")

    };
    var postData = {
      page: page,
      size: 20
    };
    var palyParam = {
      url: getIdentifications,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  // 鉴定 - 个人求鉴定
  getPresonIdentify: function (page) {
    var that = this;
    var suCb = function (res) {
      list1 = list1.concat(res.data.content)
      that.setData({
        identifications: list1
      })
      // console.log(that.data.identifications)
    };
    var erCb = function (res) {
      console.log("失败")

    };
    var postData = {
      uid:that.data.uid,
      page: page,
      size: 20
    };
    var palyParam = {
      url: getPresonIdentify,
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
  onShow:function(){
    this.setData({
      identifications: []
    })
    page = 1;
    list = [];
    page1 = 1;
    list1 = [];
    if(this.data.pages==1){
      this.getPresonIdentify(1)
    }else{
      this.getIdentifications(1)
    }
  },
  //tab事件调用
  nearby: function () {
    footer.footer.nearby();
  },
  find: function () {
    footer.footer.find();
  },
  index: function () {
    footer.footer.index();
  },
  identify: function () {
    footer.footer.identify();
  },
  mine: function () {
    footer.footer.mine();
  },
  //跳转到鉴别详情页
  _identifyDetail:function(e){
    if (this.data.pages == 1) {
      wx.navigateTo({
        url: '../identifyDetail/identifyDetail?identificationId=' + e.detail.identificationId + '&recognitionId=' + e.detail.recognitionId+'&pages=1',
      })
    } else {
      wx.navigateTo({
        url: '../identifyDetail/identifyDetail?identificationId=' + e.detail.identificationId + '&recognitionId=' + e.detail.recognitionId,
      })
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   if (this.data.pages == 1) {
  //     page1 = page1 + 1;
  //     this.getPresonIdentify(page)
  //   }else{
  //     page = page + 1;
  //     this.getIdentifications(page);
  //   }
    
    
  // }, 

  bindDownLoad: function () {
    if (this.data.pages == 1) {
      page1 = page1 + 1;
      this.getPresonIdentify(page)
    } else {
      page = page + 1;
      this.getIdentifications(page);
    }
  },



})