// pages/nearby/nearby.js
const app = getApp();
var page = 1;
var list = [];
var footer = require("../../utils/util.js");
var tool = require('../../utils/tool.js');
var util = tool.util, //工具手柄
  getRecognitions = tool.configApi.getRecognitions; //获取 附近的识别列表
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    windowHeight: 0, //获取屏幕的高度
    contentHeight: 0,
    windowWidth: 0, //获取屏幕的宽度
    left: 0,
    data: [], //获取列表的信息
    lt: "<",
    gt: '>',
    marke: [],
    current: 0, //当前滑块
    markers: [],
    latitude: '',
    longitude: '',
    templat: "", //临时纬度
    templog: "", //临时经度
    textData: {},
    flage:false,  //附近列表的显示隐藏
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var array_pl = footer.array_pl
    that.setData({
      array_pl
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    var that = this;
    that.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight,
      contentHeight: 110
    })
    // ===============获取本地经纬度===============
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        app.globalData.longitude = longitude
        app.globalData.latitude = latitude
        that.setData({
          lat: latitude,
          lon: longitude
        });
        // =====执行获取附近识别列表=====
        that.getRecognitions(latitude, longitude,1);
      }
    })
  },

  // ===============监听marker点击事件 ===============
  makertap: function (e) {
    var that = this;
    that.setData({
      flage:true
    })
    var id = e.markerId;
    var item = that.data.data;
    for (var i in item) {
      if (id == item[i].recognitionId) {
        that.setData({
          current: i
        })
        return;
      }
    }
  },
  // ===============下载mark标记头像===============
  getUserPic: function (pic_url, i) {
    var that = this;
    let cachePath;
    if (pic_url == null || pic_url == '') return;
    wx.downloadFile({
      url: pic_url,
      success: (pathInfo) => {    
        cachePath = pathInfo.tempFilePath.replace("http:/", '').replace("https:/", '')
        var mak = "marke[" + i + "].iconPath";
        that.setData({
          [mak]: cachePath
        })
      },
      fail: function (res) { }
    })
  },
  // ===============监听地图视图发生变化===============
  regionchange(e) {
    var that = this;
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      that.getCenterLocation()
    }
  },
  // ===============获取当前地图中心的经纬度 ===============
  getCenterLocation: function () {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        // console.log(res.longitude)
        // console.log(res.latitude)
        // that.getRecognitions(res.latitude, res.longitude);
      }
    })
  },
  // ===============获取附近识别列表===============
  getRecognitions: function (latitude, longitude, page) {
    var that = this;
    var markCont = []; //定义地图标记数组
    var markElent = {}; //定义地图标记元素
    if (that.data.templat != "") {
      that.setData({
        lat: that.data.templat,
        lon: that.data.templog,
      })
    }
    var suCb = function (res) {
      // console.log("识别列表", res)
      var item = res.data.content;
      for (var i in item) {
        item[i].month = item[i].createdAt.substr(5, 2);
        var a = parseInt(item[i].month.charAt(0))
        if (a == 0) {
          item[i].month = parseInt(item[i].month.charAt(1))
        } else {
          item[i].month = parseInt(item[i].createdAt.substr(5, 2));
        }
        //每年3月至5月划为春季，6月至8月划为夏季，9月至11月划为秋季，12月至下一年2月划为冬季
        if (item[i].month >= 3 && item[i].month <= 5) {
          item[i].season = "春"
        } else if (item[i].month >= 6 && item[i].month <= 8) {
          item[i].season = "夏"
        } else if (item[i].month >= 9 && item[i].month <= 11) {
          item[i].season = "秋"
        } else {
          item[i].season = "冬"
        };
        var url = item[i].image.replace("http:/", 'https:/')
        that.getUserPic(url, i);
        markElent = {
          iconPath: "",
          id: item[i].recognitionId,
          latitude: item[i].latitude,
          longitude: item[i].longitude,
          width: 40,
          height: 40,
        }
        markCont.push(markElent);
      }
      that.setData({
        data: res.data.content,
        marke: markCont
      })
    };
    var erCb = function (res) {
      console.log(res)
      wx.showToast({
        icon:'none',
        title: '获取附近列表失败',
      })
    };
    var postData = {
      longitude: longitude,
      latitude: latitude,
      distance: 10000000,
      page: page,
      size: 20
    };
    var palyParam = {
      url: getRecognitions,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  currentLoaction: function (e) { //地图上显示图标
    wx.getSystemInfo({
      success: function (res) {
        widthCtr = res.screenWidth;
        //console.log(widthCtr + "=====");
        e.setData({
          height: res.windowHeight - 59,
          controls: [{
            id: 1,
            iconPath: '../images/1.png',
            position: {
              left: res.screenWidth - 50,
              top: 300 - 50,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        })


      }
    })
  },
  controltap(e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度 

        })
      }
    })
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
  // 搜索入口  
  wxSearchTab: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //点击进入消息页面
  message: function () {
    wx.navigateTo({
      url: '../message/message'
    })
  },
  //点击进入签到页面
  sign: function () {
    wx.reLaunch({
      url: '../sign/sign'
    })
  },
  //点击进入附近详情页
  nearbyDetail: function (e) {
    wx.navigateTo({
      url: '../nearbyDetails/nearbyDetails?recognitionid=' + e.currentTarget.dataset.recognitionid + '&longitude=' + e.currentTarget.dataset.longitude + '&latitude=' + e.currentTarget.dataset.latitude + '&month=' + e.currentTarget.dataset.month + '&season=' + e.currentTarget.dataset.season,
    })
  },
  // 高德地图===============================================================
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  },
  //显示出附近列表
  showNear:function(){
    this.setData({
      flage: false
    })
  }





})