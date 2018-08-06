// pages/personalInfo/personalInfo.js
const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getMembers = tool.configApi.getMembers,  //会员-会员信息
  getPresonInfo = tool.configApi.getPresonInfo;  //会员-更新会员信息
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    members:null,
    signName: '欢迎识别绚丽多彩的世界！',
    bio:'',
    bg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //我的
  getMembers: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        members: res.data,
        bio:res.data.bio,
        bg: res.data.background
      })
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMembers()
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
  //修改背景图片
  takePhoto() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // console.log("相册来源:",res)
        // that.setData({ bg: tempFilePaths[0] }) 
        that.upMap(tempFilePaths[0])
        
      }
    })
  },


  //上传选择的图片
  upMap: function (imgUrl) {
    var that = this;
    const uploadTask = wx.uploadFile({
      url: getPresonInfo, // 
      filePath: imgUrl,
      name: 'background',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        'uid': app.globalData.uid,
        'bio': that.data.bio,
        'background': imgUrl,
      },
      success: function (res) {
        that.setData({ bg: imgUrl }) 
      },
      fail: function (res) {
        console.log("失败")
      }
    });
  },

  
  //修改个性签名
  personalSign:function(e){
    wx.navigateTo({
      url: '../personalSign/personalSign?content=' + e.currentTarget.dataset.content + '&type=' + e.currentTarget.dataset.type + '&img=' + this.data.bg,
    })
  }
})