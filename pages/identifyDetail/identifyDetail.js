// pages/identifyDetail/identifyDetail.js
const app = getApp(); 
var page = 1; 
var list = [];
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getIdentifiDetail = tool.configApi.getIdentifiDetail,  //鉴定 - 获取鉴定信息
  getComments = tool.configApi.getComments,  //鉴别评论
  getCancalResult = tool.configApi.getCancalResult, //取消鉴定
  getRemark = tool.configApi.getRemark;  //评论
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identificationId: 0,  //鉴定id
    ideInfo:{},  //获取鉴别详情的信息
    content:"",  //评论内容
    remarkContent:{},  //鉴别评论的内容
    name:"",  //点击数量时获取当前的名字
    recognitionId:0,
    pages:0,
    disabled:false,
    identifiedByUid:Boolean,  //是否被鉴定过
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    list = [];
    this.setData({
      identificationId: options.identificationId,
      recognitionId: options.recognitionId,
      pages: options.pages
    })
    console.log(options)
    this.getIdentifiDetail();
  
  },
  //鉴定 - 获取鉴定信息
  getIdentifiDetail: function () {
    var that = this;
    var suCb = function (res) {
        var item = res.data;
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
     
      that.setData({
        ideInfo: res.data,
        identifiedByUid:res.data.identifiedByUid
      })
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      identificationId: that.data.identificationId,
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude,
      uid: app.globalData.uid
    };
    var palyParam = {
      url: getIdentifiDetail,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //点击评论
  getRemark: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        content: ""
      })
      list = [];
      that.getComments(1);
      that.getIdentifiDetail();
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      recognitionId: that.data.recognitionId,
      content: this.data.content
    };
    var palyParam = {
      url: getRemark,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //评论列表
  getComments: function (page) {
    var that = this;
    var suCb = function (res) {

      for (var item of res.data.content) {
        item.time = item.createdAt.substr(5, 5)
      }

      list = list.concat(res.data.content)
      that.setData({
        remarkContent: list
      })
      //console.log(that.data.remarkContent)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      recognitionId: that.data.recognitionId,	
      page: page,
      size:20
    };
    var palyParam = {
      url: getComments,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //点击数量增加
  getNums: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        // newNums: res.data.results.num
      })
      that.getIdentifiDetail();
      console.log(res.data)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      recognitionId: that.data.recognitionId,
      content: that.data.name
    };
    var palyParam = {
      url: getRemark,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //取消鉴定
  getCancalResult: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        // ideInfo: res.data
      })
      that.getIdentifiDetail();
      // console.log(res.data)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      identificationId:that.data.identificationId,
      uid: app.globalData.uid
    };
    var palyParam = {
      url: getCancalResult,
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
    this.getComments(1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  _back:function(){
    wx.reLaunch({
      url: '../identify/identify',
    })
  },
  //点击评论
  // 防止重复点击 
  _touchStart:function(e){ 
    this.touchStartTime = e.timeStamp; 
  }, 
  _touchEnd: function(e){ 
    this.touchEndTime = e.timeStamp; 
  },

  _remark: function(e){
    console.log(e)
    var vm = this; 
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件 
    if (vm.touchEndTime - vm.touchStartTime < 350) { 
      // 当前点击的时间 
      var currentTime = e.timeStamp; 
      var lastTapTime = vm.lastTapTime; 
      // 更新最后一次点击时间 
      vm.lastTapTime = currentTime; 
      // 如果两次点击时间在300毫秒内，则认为是双击事件 
      if (currentTime - lastTapTime > 300) { 
           console.log(11)
           vm.setData({
              content: e.detail
            })
           vm.getRemark();
           vm.getComments();
      } 
    }

    // console.log(11)
    // this.setData({
    //   content: e.detail
    // })
    // this.getRemark();
    // this.getComments();
  },
  //点击数量增加
  _nums:function(e){
    console.log(11)
    var that = this;
    if (that.data.identifiedByUid==true){
      this.getCancalResult(); //取消鉴定
      

    }else{
      that.setData({
        name: e.detail
      })
      that.getNums()  //数量增加
    }
    // this.setData({
    //   name:e.detail
    // })
    // this.getNums()  //数量增加

    // this.getCancalResult(); //取消鉴定
  },
  onReachBottom:function(){
    page = page + 1;
    this.getComments(page);
  },
  //跳转到个人主页页面 
  _personalPage: function (e) {
    // console.log(e)
    wx.navigateTo({
      url: '../personalPage/personalPage?uid=' + e.detail,
    })
  },
  //点击头像跳转到个人主页
  _person: function (e) {
    wx.navigateTo({
      url: '../personalPage/personalPage?uid=' + e.detail,
    })
  }
})