const app = getApp();
var WxSearch = require('../../components/wxSearchView/wxSearchView.js');
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getSearch = tool.configApi.getSearch;  //获取 通用-搜索

Page({
  data: {
    searchValue: '',  //搜索内容
    showData:[],  //展示内容
    isShow:true,  //搜索是否有内容
    searchPlant:[],  //植物信息
    searchArticle:[], //文章信息
    searchLocation:[], //足迹信息  
  },

  // 搜索栏
  onLoad: function (options) {
    //-----------------------------------------------
    var that = this;
    
  //-------------------------------------------------------------
    //搜索页面跳回-开始-------------------------------------------------------------
    if (options && options.searchValue) {
      this.setData({
        searchValue: options.searchValue,
        showData: that.data.showData
      });
    }
  //搜索页面跳回---结束-----------------------------------------------------------
    WxSearch.init(
      that,  // 本页面一个引用
      ['杭州', '嘉兴', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
      ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );


  
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    wx.reLaunch({
      url: '../findList/findList?searchValue=' + value
    })
  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.reLaunch({
      url: '../search/search?searchValue=取消'
    })
  },
  //定义搜索列表点击进入植物列表的事件
  _findDetail:function(e){
    //跳转到搜索详情的列表页
    wx.navigateTo({
      url: '../findDetail/findDetail?name=' + e.detail
    })
  },
  //定义跳转到文章详情页
  _articleDetail(e) {
    wx.navigateTo({
      url: '../articleDetail/articleDetail?id=' + e.detail
    })
  },
  //定义跳转到足迹详情页
  _locationDetail(e) {
    console.log(e.detail)
    wx.navigateTo({
      url: '../footprintDetail/footprintDetail?locationId=' + e.detail
    })
  },
  // 定义获取搜索结果数据
  getSearch: function () {   
    var that = this;
    var suCb = function (res) {
     that.setData({
       searchPlant: res.data.plantLibrary,  //植物信息
       searchArticle: res.data.article, //文章信息
       searchLocation: res.data.location, //足迹信息  
     })
     console.log(res.data)
    };
    var erCb = function (res) {
      console.log("失败")

    };
    var postData = {
      uid: app.globalData.uid,
      keywords: that.data.searchValue
    };
    var palyParam = {
      url: getSearch,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //调用
  onReady: function () {
    this.getSearch();
  },


})
