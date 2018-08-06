const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const array_pl = 0;
const array_pl1 = 1;
const array_pl2 = 2;
const array_pl3 = 3;

// var index = getApp().globalData.index;
var footer = {
  //点击附近
  nearby: function () {
    wx.redirectTo({
      url: '../nearby/nearby'
    })
  },
  //点击发现
  find: function () {
    getApp().globalData.index = 1;
    wx.redirectTo({
      url: '../find/find'
    })
  },
  //点击照相机
  index: function () {
    wx.navigateTo({
      url: '../index/index'
    })
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var tempFilePaths = res.tempFilePaths
    //   }
    // })
  },
  //点击鉴别
  identify: function () {
    getApp().globalData.index = 2;
    wx.redirectTo({
      url: '../identify/identify'
    })
  },
  //点击我的
  mine: function () {
    getApp().globalData.index=3;
    wx.redirectTo({
      url: '../mine/mine'
    })
  }
}


module.exports = {
  formatTime: formatTime,
  footer:footer,
  array_pl: array_pl,
  array_pl1: array_pl1,
  array_pl2: array_pl2,
  array_pl3: array_pl3
}
