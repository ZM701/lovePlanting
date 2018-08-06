var configApi = require('../libs/configApi.js');
// var doLogin = require('../lib/doLogin.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var handle = {
  //网络请求
  request: function (param) {
    // console.log(param);
    wx.request({
      url: param.url || '',
      method: param.method || 'GET',
      data: param.data || '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: param.type || 'json',
      success: function (res) {
        // console.log(res);
        // 请求成功
        if (1 == res.data.state) {
          // console.log(res)
          typeof param.success === 'function' && param.success(res);
        }
        // 请求数据错误
        else if (0 == res.data.state) {
          // console.log(res)
          typeof param.error === 'function' && param.error(res);
        }
      },
      fail: function (res) {
        // console.log(res)
        typeof param.error === 'function' && param.error(res.errMsg);
      },
    })
  },

  //显示loding
  showLoading: function (text) {
    wx.showToast({
      title: text,
      icon: 'loading',
      duration: 1000
    })
  },
  //隐藏loding
  hideLoading: function () {
    wx.hideToast();
  },

  //转换时间戳
  timetrans: function (date) {
    var date = new Date(date * 1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  },


  //登录
  doLogin: function (cb) {
    wx.showLoading({
      title: '正在登录',
    })
    var that = this;
    wx.login({
      success: function (res) {
        wx.hideLoading();
        if (res.code) {
          console.log('获取code成功', res.code);
          var code = res.code;
          // 获取用户信息
          that.getUid(code,cb);
        } else {
          wx.showToast({
            title: '获取登录失败请退出重试',
          })
          console.log('获取用户登录态失败！' + res.errMsg);
          options.fail && options.fail({
            errCode: -1,
            errMsg: '获取用户登录态失败，请退出重试'
          });
        }
      },
      fail: function () {
        console.log('获取用户登录态失败！' + res.errMsg);
        if (ret.errMsg == 'request:fail timeout') {
          var errCode = -1;
          var errMsg = '网络请求超时，请检查网络设置';
        }
        options.fail && options.fail({
          errCode: errCode || -1,
          errMsg: errMsg || '获取用户登录态失败，请退出重试'
        });
      }
    });
  },
  getUid: function (code,cb) {
    var userInfo=wx.getStorageSync('userInfo');
    wx.hideLoading();
    var cbOk = cb;
    var cbErr = function (res) {
      // console.log(res)
      wx.showToast({
        title: '网络请求出现问题',
        icon: 'none',
        duration: 4000
      });
    };
    var postdata = {
      nickname: userInfo.nickName,
      sex: userInfo.gender,
      headimgurl: userInfo.avatarUrl,
      province: userInfo.province,
      city: userInfo.city,
      code: code,
      xcx_type: 4,
      xcx: "nnw",
    };
    var param = {
      url: configApi.login,
      method: "POST",
      data: postdata,
      success: cbOk,
      error: cbErr,
    };
    handle.request(param)
  }

};

module.exports = {
  util: handle,
  formatTime: formatTime,//获取日期和时间
  configApi: configApi,  //请求地址配置
}
