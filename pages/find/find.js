// pages/find/find.js
var app = getApp();
var register = require('../../components/Refresh/refreshLoadRegister.js');
var footer = require("../../utils/util.js");
var app = getApp();
var mtabW;
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getRecommend = tool.configApi.getRecommend,  //推荐
  getInterest = tool.configApi.getInterest,  //会员-感兴趣的人列表
  getAdvs = tool.configApi.getAdvs, //获取广告内容列表
  getFollowed = tool.configApi.getFollowed;  //关注

var page = 1;
var pages = 1;
var list = [];
var lists = [];

Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        text: '推荐'
      },
      {
        text: '关注'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    // 轮播图
    movies: [],
    
    recommend:[], //推荐信息内容  
    followed:[], //关注信息列表
    interestInfo:[], //感兴趣的人列表
    // windowHeight: null, // 屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    pages = 1;
    list = [];
    lists = [];

    var array_pl1 = footer.array_pl1
    this.setData({
      array_pl1
    })
    

    var _this = this;
    register.register(this);


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
  //会员 - 感兴趣的人的列表
  getInterest: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        interestInfo: res.data.content
      })
      console.log(that.data.interestInfo)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      // uid: app.globalData.uid, 
      uid: app.globalData.uid,  //登录用户uid
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude,
      page: 1,
      size: 20

    };
    var palyParam = {
      url: getInterest,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //获取广告内容列表
  getAdvs: function (page) {
    var that = this;
    var suCb = function (res) {
      var url=[];
      for (var item of res.data.contents){
        url.push({
          url: item.image,
          urlType: item.urlType,
          param: item.param,
          contentId: item.contentId
        })
        that.setData({
          movies:url
        })
        console.log(res.data.contents)
      }
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      code: 'carousel_figure',//首页闪图：flash_figure 发现页轮播图：carousel_figure
    };
    var palyParam = {
      url: getAdvs,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //推荐
  getRecommend: function (page) {
    var that = this;
    var suCb = function (res) {
      list = list.concat(res.data.content)
      that.setData({
        recommend: list
      })
      // console.log(that.data.recommend)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      page: page,
      size: 20
    };
    var palyParam = {
      url: getRecommend,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },

  //下拉加载
  bindDownLoad: function () {
    if (this.data.currentTab == 0) {
      page = page + 1;
      this.getRecommend(page);
    } else {
      pages = pages + 1;
      this.getFollowed(pages);
    }
  },

  //关注
  getFollowed: function (page) {
    var that = this;
    var suCb = function (res) {
      lists = lists.concat(res.data.content)
      that.setData({
        followed: lists
      })
    //  console.log(res.data)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      // uid:22,
      page: page,
      size: 20
    };
    var palyParam = {
      url: getFollowed,
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
    this.getInterest();
    this.getAdvs();
    this.getRecommend(1);
    this.getFollowed(1);
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
  // tab滑动切换
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
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 2;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
 
  //跳转到可能感兴趣的人的页面
  loop:function(){
    wx.navigateTo({
      url: '../interest/interest',
    })
  },
  //点击跳转到足迹详情页
  footprintDetail(e){
    // console.log(e)
    wx.navigateTo({
      url: '../footprintDetail/footprintDetail?locationId=' + e.currentTarget.dataset.locationid,
    })
  },
  // //点击跳转到文章详情页
  // articleDetail(e){
  //   wx.reLaunch({
  //     url: '../articleDetail/articleDetail?locationId=' + e.currentTarget.dataset.locationid,
  //   })
  // },
  //点击轮播图跳转
  loops(e){
    // console.log(this.data.movies)
    // console.log(e)
    //点击跳转类型，0无跳转，1文章详情，2-南泥湾应用商店
    var urltype = e.currentTarget.dataset.urltype; 
    if (urltype==1){
      // console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../articleDetail/articleDetail?id=' + e.currentTarget.dataset.param,
      })
    }
    if (urltype == 2) {
      //跳转到南泥湾应用商店
      try {
        var res = wx.getSystemInfoSync()
        console.log(/(iPhone|iPad|iPod|iOS)/i.test(res.model))
        if (/(iPhone|iPad|iPod|iOS)/i.test(res.model) == true) {
          wx.navigateTo({
            url: '../out/out',
          })
        } else {
          wx.navigateTo({
            url: '../out1/out1',
          })
        }
      } catch (e) {
        // Do something when catch error
      }
    } 
  }

})