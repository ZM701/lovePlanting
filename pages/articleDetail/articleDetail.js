// pages/articleDetail/articleDetail.js
const WxParse = require('../../wxParse/wxParse.js');
var tool = require('../../utils/tool.js');
var util = tool.util,//工具手柄
  getArticleDetail = tool.configApi.getArticleDetail;  //通用-文章详情
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,  //文章详情id
    articleInfo:{},  //文章详情信息
    article_contents:null, //文章内容

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  
  },
  //通用-文章详情
  getArticleDetail: function () {
    var that = this;
    var suCb = function (res) {
      that.setData({
        articleInfo: res.data.article
      })
      console.log(res.data)

      //解析富文本
      let contents = res.data.article.content
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")

      
      let article_content = contents;

      WxParse.wxParse('article_contents', 'html', article_content, that, 5);
      console.log(that.data.article_contents.nodes)
    };
    var erCb = function (res) {
      console.log("失败")
    };
    var postData = {
      article_id:that.data.id
    };
    var palyParam = {
      url: getArticleDetail,
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
    this.getArticleDetail();
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
  //回到发现页面
  _back:function(){
    wx.reLaunch({
      url: '../find/find',
    })
  },
  //跳转到更多评论页面
  _more:function(){
    wx.navigateTo({
      url: '../moreComment/moreComment',
    })
  },
  //跳转到个人主页页面
  _personalPage:function(){
    wx.reLaunch({
      url: '../personalPage/personalPage',
    })
  }
})