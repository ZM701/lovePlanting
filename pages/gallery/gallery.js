// pages/gallery/gallery.js
var adds = {}; 
const app = getApp();
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getPost = tool.configApi.getPost;  //上传
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWords:'',
    plantId:0,
    //时间控件
    content: false,
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    //上传图片
    img_arr: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.keyWords != ''){
      this.setData({
        keyWords: options.keyWords
      })
    }
    if (options.plantId != ''){
      this.setData({
        plantId: options.plantId
      })
      console.log(this.data.plantId)
    }
    
  
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  searchPlant:function(){
    wx.navigateTo({
      url: '../searchPlant/searchPlant',
    })
  },
  showDatePicker: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },
  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    // console.log(e);
    this.setData({
      date: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },
  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
  formSubmit: function () {
    this.upload()
  },

  upload: function () {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        url: getPost,
        filePath: that.data.img_arr[i],
        name: 'file',
        formData: {
          'plantId': that.data.plantId,
          'longitude': app.globalData.longitude,
          'latitude': app.globalData.latitude,
          'shotAt': that.data.date+" 00:00:00",
          'images': that.data.img_arr
        },
        success: function (res) {
          console.log(res)
          if (res) {
            wx.showToast({
              title: '已提交发布！',
              duration: 3000
            });
          }
        }
      })
    }
  },
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '已经达到上限了',
        icon: 'loading',
        duration: 1000
      });
    }
  },  
  //删除
  del:function(e){
    var index = e.currentTarget.dataset.index;
    this.data.img_arr.splice(index, 1);
    this.setData({
      img_arr: this.data.img_arr
    })

  }
})