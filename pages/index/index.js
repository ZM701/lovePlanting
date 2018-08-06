// pages/index/index.js
var footer = require("../../utils/util.js");
const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util, //工具手柄
  getIdentification = tool.configApi.getIdentification, //求鉴定
  getSave = tool.configApi.getSave, //获取识别接口
  getNearDetail = tool.configApi.getNearDetail ,//识别详情 鉴定信息
  upData = tool.configApi.upData; //确认植物接口
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    recognitionId: "", //识别id
    recognitionName: "", //识别名称
    deviceHeight: "", //设备高度
    progress: "", //上传进度
    imgUrl: '', // 拍摄图片的本地显示路径
    resultLest: [] //识别结果列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("页面传参信息：",options)
    var that = this;
    that.getUserInfo()
    that.getDeviceHeight()
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
    
    if (options.recognitionId != undefined){
      //从识别列表页面进入 
      var recognitionId = options.recognitionId;
      this.getNearDetail(this.data.uid, recognitionId)
      var url = options.imgUrl.replace(/http/, "https") //替换下载图片https 
      //下载识别历史页面过来的图片
      wx.downloadFile({
        url: url, 
        success: function (res) {
          // 200为响应成功 进入 success 回调，
          if (res.statusCode === 200) {
            that.setData({
              imgUrl: res.tempFilePath
            })
          }
        }
      })
    }else{
      if (options.imgUrl != undefined) {
        that.setData({
          imgUrl: options.imgUrl
        })
      }
    }
  },
  // 识别详情 鉴定信息
  getNearDetail: function (uid, recognitionId) {
    var that = this;
    var suCb = function (res) {
      console.log("结果",res)
      that.setData({
        resultLest: res.data.result, //识别列表
        recognitionId: recognitionId, //识别id
        recognitionName: res.data.result[0].name //设置默认识别名称
      })
    };
    var erCb = function (res) {
      wx.showToast({
        title: '获取鉴定结果失败',
      })
    };
    var postData = {
      uid: that.data.uid, //uid
      recognitionId: recognitionId
    };
    var palyParam = {
      url: getNearDetail,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //求鉴定
  getIdentification: function() {
    var that = this;
    var suCb = function(res) {
      wx.navigateTo({
        url: '../identify/identify',
      })
    };
    var erCb = function(res) {
      console.log("失败")
    };
    var postData = {
      uid: that.data.uid, //uid
      recognitionId: that.data.recognitionId
    };
    var palyParam = {
      url: getIdentification,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //暂存用户信息
  getUserInfo: function() {
    var that = this;
    var value = wx.getStorageSync('userInfo');
    var uid = wx.getStorageSync('uid')
    that.setData({
      uid: uid
    })
    console.log("个人缓存信息：", value)
    wx.downloadFile({
      url: value.avatarUrl, //微信头像地址
      success: function(res) {
        // 200为响应成功 进入 success 回调，
        if (res.statusCode === 200) {
          that.setData({
            headerMap: { //头像信息
              url: res.tempFilePath,
            },
            authorInfo: { //用户名
              name: value.nickName,
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // if (this.data.resultLest != "") {
    //   //如果存在识别结果 直接返回 防止多次识别
    //   return;
    // } else {
    //   if (this.data.imgUrl != '') {
    //     this.upMap(this.data.imgUrl)
    //   }
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //tab事件调用
  nearby: function() {
    footer.footer.nearby();
  },
  find: function() {
    footer.footer.find();
  },
  index: function() {
    footer.footer.index();
  },
  identify: function() {
    footer.footer.identify();
  },
  mine: function() {
    footer.footer.mine();
  },
  // 获取设备高度
  getDeviceHeight: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log('设备的可视高度为', res.windowHeight);
        that.setData({
          deviceHeight: res.windowHeight
        })
      }
    })
  },
  // 从相册识别
  discernAlbum: function() {
    this.takePhoto('album')
  },
  // 拍照识别
  discernPhoto: function() {
    this.takePhoto('camera')
  },
  // 拍照或者从相册选择 图片
  takePhoto(type) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // console.log("相册来源:",res)
        that.setData({
          imgUrl: tempFilePaths[0]
        })
        that.upMap(tempFilePaths[0])
      }
    })
  },
  //上传选择的图片
  upMap: function(imgUrl) {
    var that = this;
    var uid = wx.getStorageSync('uid');
    const uploadTask = wx.uploadFile({
      url: getSave, //
      filePath: imgUrl,
      name: 'image',
      formData: {
        'uid': uid,
        'longitude': that.data.longitude,
        'latitude': that.data.latitude,
      },
      success: function(res) {
        var result = JSON.parse(res.data)
        console.log('识别结果：', result)
        if (result.result[0].name == "非植物") {
          wx.showToast({
            title: '非植物 请重新上传！',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        that.setData({
          resultLest: result.result, //识别列表
          recognitionId: result.recognitionId, //识别id
          recognitionName: result.result[0].name //设置默认识别名称
        })
      },
      fail: function(res) {
        // console.log("没有识别成功")
        wx.showToast({
          title: '识别失败，请重新上传',
          icon: 'none',
          duration: 3000
        })
      }
    });
    //上传监听
    uploadTask.onProgressUpdate((res) => {
      // console.log('上传进度', res.progress)
      that.setData({
        progress: res.progress
      })
    })
  },
  //swiper 滑动监听
  bindchange: function(e) {
    // console.log("swiper 滑动监听:",e)
    var result = this.data.resultLest
    this.setData({
      recognitionName: result[e.detail.current].name
    })
  },
  // 确认是此花
  sure: function() {
    wx.showLoading({
      title: '确认中···',
    })
    var that = this;
    var suCb = function(res) {
      wx.hideLoading();
      wx.showToast({
        title: '确认成功',
      });
      that.setData({
        imgUrl: '', // 拍摄图片的本地显示路径
        resultLest: [] //识别结果列表
      })
    };
    var erCb = function(res) {
      wx.showToast({
        title: '确认失败',
      })
    };
    var postData = {
      uid: that.data.uid, //uid
      recognitionId: that.data.recognitionId,
      name: that.data.recognitionName
    };
    var palyParam = {
      url: upData,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },
  //点击求专家鉴定 
  identifyDetail: function() {
    this.getIdentification()
  },
  //点击进入识别结果详情页
  plantDetail(e) {
    // console.log(this.data.recognitionId)
    // console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '../nearbyDetails/nearbyDetails?name=' + e.currentTarget.dataset.name + '&recognitionid=' + this.data.recognitionId + '&difference=1' + '&resultLest=' + this.data.resultLest,
    })
  }


})