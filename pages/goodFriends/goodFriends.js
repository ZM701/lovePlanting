const app = getApp(); 
var page0 = 1;
var page1 = 1;
var page2 = 1;
var list0 = [];
var list1 = [];
var list2 = [];
var register = require('../../components/Refresh/refreshLoadRegister.js');
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getFans = tool.configApi.getFans,
  getAttention = tool.configApi.getAttention,  //会员-关注
  getCancleAttention = tool.configApi.getCancleAttention,  //会员-取消关注
  getFolow = tool.configApi.getFolow;  //关注列表
Page({
  data: {
    navData: [
      {
        text: '好友'
      },
      {
        text: '关注'
      },
      {
        text: '粉丝'
      },
    ],
    currentTab: 0,
    navScrollLeft: 0,
    follow:[],  //关注列表
    fans:[],  //粉丝列表
    followingid:0, //关注id
    windowHeight: null, // 屏幕高度
  },
  //事件处理函数
  onLoad: function (options) {
    page0 = 1;
    page1 = 1;
    page2 = 1;
    list0 = [];
    list1 = [];
    list2 = [];

    register.register(this);
    this.setData({
      currentTab: options.activeIndex
    })

    var that = this;
    //获取屏幕的相关信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });
    

  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/3
    var singleNavWidth = this.data.windowWidth / 3;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 3;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  //关注列表
  getFolow: function (page) {
    var that = this;
    var suCb = function (res) {
      list1 = list1.concat(res.data.content);
      that.setData({
        follow: list1,
      })
      console.log(that.data.follow)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      page: page,
      size:20
    };
    var palyParam = {
      url: getFolow,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //粉丝列表
  getFans: function (page) {
    var that = this;
    var suCb = function (res) {
      list2 = list2.concat(res.data.content);
      that.setData({
        fans: list2, 
      })
      // console.log(that.data.fans)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      page: page,
      size: 20
    };
    var palyParam = {
      url: getFans,
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
      if (that.data.currentTab==1){       
        list1 = [];
        that.getFolow(1);
      }
      if (that.data.currentTab == 2){
        list2 = [];
        that.getFans(1);
      }     
      
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.followingid,  //被关注者uid
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
  getCancleAttention: function (index) {
    var that = this;
    var suCb = function (res) {
      if (that.data.currentTab == 1) {
        list1.splice(index, 1)
        that.setData({
          follow: list1,
        })
        that.getFolow(page1);
      }
      if (that.data.currentTab == 2) {
        list2 = [];
        that.getFans(1);
      }
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.followingid,  //被关注者uid
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
  onReady:function(){
    this.getFolow(1);
    this.getFans(1);
  },
  attention(e){
    this.setData({
      followingid: e.currentTarget.dataset.followingid
    })
    this.getAttention()
  },
  cancleAttention(e){
    this.setData({
      followingid: e.currentTarget.dataset.followingid
    })
    this.getCancleAttention(e.currentTarget.dataset.index)
  },
  //下拉加载
  bindDownLoad: function () {
    if (this.data.currentTab == 0) {
      page0 = page0 + 1;
      this.getRecommend(page0);
    } if (this.data.currentTab == 1) {
      // console.log(1111)
      page1 = page1 + 1;
      this.getFolow(page1);
    } if (this.data.currentTab == 2) {
      page2 = page2 + 1;
      this.getFans(page2);
    }
  },
  //点击头像跳转到个人主页
  personPage:function(e){
    console.log(e.currentTarget.dataset.uid)
    wx.navigateTo({
      url: '../personalPage/personalPage?uid=' + e.currentTarget.dataset.uid,
    })
  }
})