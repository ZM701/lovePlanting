// pages/mine/mine.js 
var footer = require("../../utils/util.js");
var mtabW;
var list = [];//空的数据
var lists = []; //空的数据
var page = 1; //分页的起始页面
var pages = 1; //分页的起始页面
const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getHistory = tool.configApi.getHistory, //会员 - 获取会员识别历史列表
  getFoot = tool.configApi.getFoot,  //会员 - 获取会员发布足迹列表
  getDelHistory = tool.configApi.getDelHistory, //识别 - 删除识别图片
  getDelFoot = tool.configApi.getDelFoot,  //识别 - 删除足迹
  getMembers = tool.configApi.getMembers;  //会员-会员信息

Page({

  /**
   * 页面的初始数据
   */
  data: {

    navData: [
      {
        text: '识别历史',
        numbers: 0 
      },
      {
        text: '记录足迹',
        numbers: 10
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    members: {}, //获取会员信息列表
    history:[], //识别历史列表
    historyLength:0,  //识别历史个数
    foot:[],//记录足迹列表
    footLength:0, // 记录足迹个数
    recognitionid: 0, //识别图片id
    locationId:0,  //足迹id
    windowHeight: null, // 屏幕高度
    scrollTop:0,  //滚过的距离
    signName:'欢迎识别绚丽多彩的世界！'


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array_pl3 = footer.array_pl3
    this.setData({
      array_pl3
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

    if (options.currentTab == null){
      this.setData({
        currentTab: 0
      })
    }else{
      this.setData({
        currentTab: options.currentTab
      })
    }


  
  },
  //我的
  getMembers: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        members: res.data,
      })
      console.log(res.data)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
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
  //识别历史
  getHistory: function (page) {
    var that = this;
    var suCb = function (res) {
      for (var item of res.data.content) {
        item.month = item.createdAt.substr(5, 2);
        item.day = item.createdAt.substr(8, 2)
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


      lists = lists.concat(res.data.content);
      that.setData({
        history: lists,
        historyLength: res.data.totalElements
      })
      // console.log(that.data.history)

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
      url: getHistory,
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
      uid: app.globalData.uid,
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
  //删除识别历史
  getDelHistory(index){
    var that = this;
    var suCb = function (res) {
      lists.splice(index,1)
      that.setData({
        history: lists
      })
      that.getHistory(page);
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      recognitionId: that.data.recognitionid
    };
    var palyParam = {
      url: getDelHistory,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //删除足迹
  getDelFoot(index){
    var that = this;
    var suCb = function (res) {
      list.splice(index, 1)
      that.setData({
        foot: lists
      })
      that.getFoot(page);
    }; 
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      location_id: that.data.locationId
    };
    var palyParam = {
      url: getDelFoot,
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
    lists = [];
    page = 1;
    pages = 1;
    this.getHistory(1);
    this.getFoot(1);
        
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMembers();
        
  },

  

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log(this.data.currentTab)
  //   if (this.data.currentTab==0){
  //     page = page + 1;
  //     this.getHistory(page);
  //   }else{
  //     pages = pages + 1;
  //     this.getFoot(pages); 
  //   }
    
    
     
  // },
  bindDownLoad: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
      mask: true
    })
    if (this.data.currentTab==0){
      page = page + 1;
      this.getHistory(page);
    }else{
      pages = pages + 1;
      this.getFoot(pages); 
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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
    console.log(getApp().globalData.index) 
    footer.footer.mine();
  },
  //tab切换左右滑动
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/2
    var singleNavWidth = this.data.windowWidth / 2;
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
  //点击生产足迹
  generateFoot:function(){
    wx.navigateTo({
      url: '../generateFoot/generateFoot',
    })
  },
  //点击设置
  setUp:function(){
    wx.navigateTo({
      url: '../setUp/setUp',
    })
  },
  //点击识别历史 跳转
  historyDetail:function(e){ 
    // console.log(e)
    var posted = e.currentTarget.dataset.posted;   // posted：true 公开的    false：仅自己可见   
    var status = e.currentTarget.dataset.status;    //  状态（0未鉴定，1已鉴定，2求鉴定） 
    var name = e.currentTarget.dataset.name;
    console.log(name)
    console.log(status)

 
    if (status == 0 && name == "非植物") {
      wx.showToast({
        title: '非植物 请对准植物重新拍照',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
    if (status == 0 && name != "非植物"){
      wx.navigateTo({
        url: '../index/index?imgUrl=' + e.currentTarget.dataset.imgurl + '&longitude=' + e.currentTarget.dataset.longitude + '&latitude=' + e.currentTarget.dataset.latitude + '&recognitionId=' + e.currentTarget.dataset.recognitionid,
      })
    }
    if (status == 1) {
      //不要关注   有沙发
      wx.navigateTo({
          url: '../nearbyDetails/nearbyDetails?recognitionid=' + e.currentTarget.dataset.recognitionid + '&longitude=' + e.currentTarget.dataset.longitude + '&latitude=' + e.currentTarget.dataset.latitude + '&month=' + e.currentTarget.dataset.month + '&season=' + e.currentTarget.dataset.season,
      })    
    }
      if (status == 2) {
        // 求高手鉴别的图片跳转鉴别详情页；
        wx.navigateTo({
          url: '../identifyDetail/identifyDetail?identificationId=' + e.currentTarget.dataset.identificationid,
        })
      }

     
    // if (posted==true){     
    //   if (status==1){
    //     //生成足迹的图片跳转附近详情页。
    //     wx.navigateTo({
    //       url: '../nearbyDetails/nearbyDetails?recognitionid=' + e.currentTarget.dataset.recognitionid + '&longitude=' + e.currentTarget.dataset.longitude + '&latitude=' + e.currentTarget.dataset.latitude + '&month=' + e.currentTarget.dataset.month + '&season=' + e.currentTarget.dataset.season,
    //     })
    //   }
    //   if (status == 2) {
    //     // 求高手鉴别的图片跳转鉴别详情页；
    //     wx.navigateTo({
    //       url: '../identifyDetail/identifyDetail?identificationId=' + e.currentTarget.dataset.identificationid,
    //     })
    //   }
    // }else{ 
    //   //仅自己可见状态的图片分为：非植物 、未点击确认是此植物 、确认是此植物

    //   //非植物，跳转到识别拍照页；

    //   //未点击确认是此植物跳转识别结果列表页面；

    //   //点击确认是此植物图片跳转识别结果详情页；

    //   wx.navigateTo({
    //     url: '../index/index?imgUrl=' + e.currentTarget.dataset.imgurl + '&longitude=' + e.currentTarget.dataset.longitude + '&latitude=' + e.currentTarget.dataset.latitude,
    //   })
    // }
    
    
  },
  //点击足迹 跳转到足迹详情页
  footprintDetail:function(e){
    wx.navigateTo({
      url: '../footprintDetail/footprintDetail?locationId=' + e.currentTarget.dataset.locationid + '&page=1',
    })
  },
  //消息
  message:function(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  //好友，关注，粉丝
  goodFriends:function(e){
    wx.navigateTo({
      url: '../goodFriends/goodFriends?activeIndex=' + e.currentTarget.dataset.activeindex,
    })
  },
  //点击拍照识别的时候
  takePhoto:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //点击删除识别历史
  delHistory:function(e){
    console.log(e)
    this.setData({
      recognitionid: e.currentTarget.dataset.recognitionid
    })
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.getDelHistory(e.currentTarget.dataset.index);
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

  },
  //点击删除足迹
  delFoot:function(e){
    
    this.setData({
      locationId: e.currentTarget.dataset.locationid
    })
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.getDelFoot(e.currentTarget.dataset.index);
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  scroll: function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    })
  },

 




})