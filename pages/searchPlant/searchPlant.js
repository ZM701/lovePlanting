var WxSearch = require('../../components/wxSearchView/wxSearchView.js');
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getHotSearch = tool.configApi.getHotSearch,  //获取 通用-热搜
  getsearchplants = tool.configApi.getsearchplants;  //模糊搜索植物库

Page({ 
  data: {
    hotKeys: [],  //热门搜索
    plants:[],
    flage:false,
    keyWords:''
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
    // wx.navigateTo({
    //   url: '../findList/findList?searchValue=' + value
    // })
  },

  // 返回回调函数
  myGobackFunction: function () {
    
    // wx.navigateTo({
    //   url: '../nearby/nearby?searchValue=取消'
    // })
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
  //模糊植物库
  getsearchplants: function (name) {
    var that = this;
    var suCb = function (res) {

      that.setData({
        plants: res.data.plants,
      })
      console.log(that.data.plants)


    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      name: name
    };
    var palyParam = {
      url: getsearchplants,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },

  //模糊搜索植物库
  wxSearchInput: function (e) {
    this.setData({
      flage: true,
      keyWords: e.detail.value
    })
    this.getsearchplants(e.detail.value)
  },
  //搜索列表
  wxSearchKeyTaps:function(e){
    this.setData({
      flage: true,
      keyWords: e.currentTarget.dataset.key
    })
    this.getsearchplants(e.currentTarget.dataset.key);
    wx.redirectTo({
      url: '../gallery/gallery?keyWords=' + e.currentTarget.dataset.key + '&plantId=' + e.currentTarget.dataset.plantid,
    })
  },

  // 点击提示或者关键字、历史记录时的操作
  wxSearchKeyTap:function(e) {
    this.setData({
      flage: true,
      keyWords: e.currentTarget.dataset.key
    })
    this.getsearchplants(e.currentTarget.dataset.key);
    this.search(e.target.dataset.key);
  },
  search:function(inputValue) {
    var __that=this
    if(inputValue && inputValue.length > 0) {
      // 添加历史记录
      this.wxSearchAddHisKey(inputValue);
      // 更新
      //var temData = __that.data.wxSearchData;
      var temData = __that.data.wxSearchData;
      temData.value = inputValue;
      __that.setData({
        wxSearchData: temData
      });
 
    }
  },
  // 添加缓存
  wxSearchAddHisKey: function(inputValue) {
    if(!inputValue || inputValue.length == 0) {
      return;
    }
    var value = wx.getStorageSync('wxSearchHisKeys');
    if (value) {
      if (value.indexOf(inputValue) < 0) {
        value.unshift(inputValue);
      }
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          getHisKeys(__that);
        }
      })
    } else {
      value = [];
      value.push(inputValue);
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          getHisKeys(__that);
        }
      })
    }
  },
  //点击取消
  cancle:function(e){
    wx.redirectTo({
      url: '../gallery/gallery',
    })
  }
})
