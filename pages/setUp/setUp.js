// pages/setUp/setUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //跳转到个人信息
  personalInfo:function(){
    wx.navigateTo({
      url: '../personalInfo/personalInfo',
    })
  },
  //跳转到关于我们
  aboutUs:function(){
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  //跳转到积分规则
  integral:function(){
    wx.navigateTo({
      url: '../integral/integral',
    })
  },
  //跳转到共建植物图库
  gallery:function(){
    wx.navigateTo({
      url: '../gallery/gallery',
    })
  },
  //清除缓存
  cleaning:function(){
    wx.showModal({
      title: '提示',
      content: '确定清除缓存',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //给爱植拍评分
  remark:function(){
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


    
  
})