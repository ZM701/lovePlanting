// pages/nearbyDetails/nearbyDetails.js  
const app = getApp();
var page = 1;
var list = [];
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getNearDetail = tool.configApi.getNearDetail,  //识别 - 获取识别详情，包括鉴定信息
  getAttention = tool.configApi.getAttention,  //会员-关注
  getComments = tool.configApi.getComments,  //评论列表
  getRemark = tool.configApi.getRemark,  //评论
  getPlantInfo = tool.configApi.getPlantInfo,  //通用 获取植物信息
  getConfirmPlant = tool.configApi.getConfirmPlant,  //更新-植物信息
  getCancleAttention = tool.configApi.getCancleAttention;  //会员-取消关注

Page({

  /**
   * 页面的初始数据
   */
  data: {
    share:false,//页面是否来自转发 默认不是 
    recognitionId:0,  //识别id
    longitude:0,  //精度
    latitude:0,  //纬度
    dataInfo:{},   //数据的获取
    month:"",  //月份
    season:"", //季节
    content: "",  //评论内容
    remarkContent: {},  //鉴别评论的内容   
    difference: 0, //0代表文章详情页  1 代表识别结果详情页
    name: "",  //识别的名字
    personid: "",
    filePath:"",
    resultLest:Object

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    var that =this;
    that.getUserInfo();
    that.setData({
      recognitionId: options.recognitionid,
      longitude: options.longitude,
      latitude: options.latitude,
      month: options.month,
      season: options.season,
      difference: options.difference,
      name: options.name,
      personid: app.globalData.uid,
      resultLest: options.resultLest
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    page = 1;
    list = [];


  },
  onShow: function () {
    if (this.data.difference == 1) {
      this.getPlantInfo()
    } else {
      this.getNearDetail()
      this.getComments(1);
    }

    // wx.navigateBack({
    //   delta: 2  //返回到首页
    // })

  },

  imgs:function(url){
    var that=this
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res) {
        console.log(res)
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          that.setData({
            filePath: res.tempFilePath
          })
        }
        // console.log(that.data.filePath)
      }
    })

  },
  // 获取附近详情数据
  getNearDetail: function () {
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
        dataInfo: res.data
      })

      
      console.log(res.data)

    };
    var erCb = function (res) {
      console.log("失败")

    };
    var postData = {
      recognitionId: parseFloat(that.data.recognitionId),
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude,
      uid: app.globalData.uid
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
  // 通用-获取植物信息
  getPlantInfo: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        dataInfo: res.data
      })
      console.log(res.data.image)
      var urls = res.data.image.replace(/http/,"https")
      that.imgs(urls)
      console.log(res.data)

    };
    var erCb = function (res) {
      console.log("失败")

    };
    var postData = {
      name: that.data.name
    };
    var palyParam = {
      url: getPlantInfo,
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
      that.getNearDetail();
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.dataInfo.uid,  //被关注者uid
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
  getCancleAttention: function () {
    var that = this;
    var suCb = function (res) {
      that.getNearDetail();
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      followingId: that.data.dataInfo.uid,  //被关注者uid
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
  //点击评论
  getRemark: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        content: ""
      })
      list = [];
      that.getComments(1)
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
      // console.log(that.data.remarkContent)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      recognitionId: that.data.recognitionId,
      page: page,
      size: 20
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

  //暂存用户信息
  getUserInfo: function () {
    var that = this;
    var value = wx.getStorageSync('userInfo');
    var uid = wx.getStorageSync('uid')
    that.setData({
      uid: uid
    })
    console.log("个人缓存信息：", value)
    wx.downloadFile({
      url: value.avatarUrl, //微信头像地址
      success: function (res) {
        // 200为响应成功 进入 success 回调，
        if (res.statusCode === 200) {
          that.setData({
            headerMap: { //头像信息
              url: res.tempFilePath,
            },
            authorInfo: { //用户名
              userNames: value.nickName,
            }
          })
        }
      }
    })
  },

  // 确认是此植物 更新植物信息
  getConfirmPlant: function () {
    console.log(this.data.filePath)
    var that = this;
    var suCb = function (res) {
      //跳转至生成美图
      wx.reLaunch({
        url: '../index/share_map/share_map?recognitionName=' + that.data.dataInfo.name + '&recognitionid=' + that.data.dataInfo.plantId + '&mapUrl=' + that.data.filePath + '&headerMap=' + that.data.headerMap.url + '&name=' + that.data.authorInfo.userNames + '&pages=11',
      })
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      uid: app.globalData.uid,
      recognitionId: that.data.recognitionId,
      name: that.data.name,
    };
    var palyParam = {
      url: getConfirmPlant,
      method: "POST",
      data: postData,
      success: suCb,
      error: erCb,
    }
    util.request(palyParam);
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page = page + 1;
    this.getComments(page);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //返回上一个页面
  // _back: function () {
  //   wx.navigateBack({
  //     changed: true
  //   })
  // },
  _back: function () {
    wx.reLaunch({
      url: '../nearby/nearby',
    })
  },
  //跳转到更多评论页面
  _more: function () {
    wx.navigateTo({
      url: '../moreComment/moreComment',
    })
  },
  //跳转到个人主页页面 
  _personalPage: function (e) {
    // console.log(e)
    wx.navigateTo({
      url: '../personalPage/personalPage?uid=' + e.detail,
    })
  },
  //点击关注
  _attention: function () {
    // console.log(this.data.dataInfo)
    this.getAttention();
  },
  //取消关注
  _cancleAttention: function () {
    // console.log(this.data.dataInfo)
    this.getCancleAttention();
  },
  //点击评论
  _remark: function (e) {
    this.setData({
      content: e.detail
    })
    this.getRemark();

    this.getComments();
  },
  //跳转到生产足迹的页面
  _generateFoot: function () {
    wx.navigateTo({
      url: '../generateFoot/generateFoot',
    })
  },
  //点击确认是此植物 
  _confirmPlant: function () {
    this.getConfirmPlant();
  },
  //跳转到个人主页
  //点击头像跳转到个人主页
  _person: function (e) {
    wx.navigateTo({
      url: '../personalPage/personalPage?uid=' + e.detail,
    })
  }
})