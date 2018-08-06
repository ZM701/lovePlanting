//index.js
var WxSearch = require('../../components/wxSearchView/wxSearchView.js');
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getHotSearch = tool.configApi.getHotSearch;  //获取 通用-热搜

Page({
  data: {
    hotKeys:[],  //热门搜索
  },

  // 搜索栏
  onLoad: function () {
    this.getHotSearch();
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
      url: '../nearby/nearby?searchValue=取消'
    })
  },
  // 获取热搜数据
  getHotSearch: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        hotKeys: res.data.keywords
      })

      //搜索热点数据渲染
      WxSearch.init(
        that,  // 本页面一个引用
        that.data.hotKeys, // 热点搜索推荐，[]表示不使用
        ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
        that.mySearchFunction, // 提供一个搜索回调函数
        that.myGobackFunction //提供一个返回回调函数
      );

    };
    var erCb = function (res) {
      console.log("失败")

    };
    var postData = {
      // xcx: "	nnw"
    };
    var palyParam = {
      url: getHotSearch,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  onReady: function () {
  },

})
