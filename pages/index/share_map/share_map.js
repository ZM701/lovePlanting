var tool = require('../../../utils/tool.js');
var util = tool.util; //工具手柄
var code = tool.configApi.getCode; //获取店铺详情
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: "",
    canvasHeight: "",
    curentIndex: 0,
    imgUrls: ["../../../images/share/mode1.jpg", "../../../images/share/mode2.jpg", "../../../images/share/mode3.jpg"],
    mapBg: { //背景图片信息
      url: "/images/share/modebg1.png",
      x_axis: 0,
      y_axis: 0,
      width: 375,
      height: 589,
    },
    map: { //图片信息(img,sx,sy,swidth,sheight,x,y,width,height)
      url: "",
      x_axis: 10,
      y_axis: 10,
      width: 355,
      height: 570,
    },
    headerMap: { //头像信息
      url: "",
      x_axis: 120,
      y_axis: 510,
      width: 40,
      height: 40,
    },
    QRcode: { //二维码
      url: "",
      x_axis: 5,
      y_axis: 600,
      width: 50,
      height: 50,
    },
    authorInfo: { //用户名
      name: "",
      x_axis: 177,
      y_axis: 535,
      size: 12,
      color: "rgba(0,0,0,.8)",
    },
    hint: { //长按二维码提示
      text: "长按识别二维码/查看更多植物故事",
      x_axis: 55,
      y_axis: 630,
      size: 12,
      color: "rgba(0,0,0,.8)",
    }
  },
  /*setCanvasMap(mapUrl,cavasWidth,x_axis,y_axis) ====================
  设置海报图片信息
  mapUrl:图片地址
  cavasWidth：绘制图片的宽度 （高度根据绘制图片和实际图片的比例自动缩放）
  x_axis：绘制图片的起始 x 位置
  y_axis：绘制图片的起始 y 位置
  */
  setCanvasMap: function(mapUrl, cavasWidth, x_axis, y_axis) {
    var that = this;
    wx.getImageInfo({
      src: mapUrl,
      success: function(res) {
        var _cavasWidth = cavasWidth //设置海报图片的宽度
        var _cavasHeight = res.height * (cavasWidth / res.width) //设置海报图片的高度 根据宽度比例缩小
        that.setData({ //设置绘制海报图片数据
          map: {
            url: mapUrl,
            x_axis: x_axis,
            y_axis: y_axis,
            width: _cavasWidth,
            height: _cavasHeight,
          },
        });
        console.log("要绘制的海报信息：", _cavasWidth, _cavasHeight)
      }
    })
  },
  // 
  choseModeHadle: function(e) {
    var index = e.currentTarget.dataset.id;
    this.setData({
      curentIndex: index
    })
    this.choseMode(parseInt(index))
  },

  // 选择模板
  choseMode: function(type) {
    console.log("type:", type)
    var that = this;
    switch (type) {
      case 0:
        that.setCanvasMap(that.data.map.url, that.data.canvasWidth, 0, 0); //设置 图片信息
        that.setData({
          mapBg: { //背景图片信息
            url: "/images/share/modebg1.png",
            x_axis: 0,
            y_axis: 0,
            width: that.data.canvasWidth,
            height: that.data.canvasHeight,
          },
          headerMap: { //头像信息
            url: that.data.headerMap.url,
            x_axis: 210,
            y_axis: 300,
            width: 40,
            height: 40,
          },
          QRcode: { //二维码
            url: "/images/share/qrcode.jpg",
            x_axis: 5,
            y_axis: 440,
            width: 50,
            height: 50,
          },
          authorInfo: { //用户名
            name: that.data.authorInfo.name,
            x_axis: 260,
            y_axis: 328,
            size: 12,
            color: "rgba(0,0,0,.8)",
          },
          hint: { //长按二维码提示
            text: "长按识别二维码/查看更多植物故事",
            x_axis: 55,
            y_axis: 470,
            size: 12,
            color: "rgba(0,0,0,.8)",
          }
        });
        break;
      case 1:
        that.setCanvasMap(that.data.map.url, that.data.canvasWidth, 0, 0); //设置 图片信息
        that.setData({
          mapBg: { //背景图片信息
            url: "/images/share/modebg2.png",
            x_axis: 0,
            y_axis: 0,
            width: that.data.canvasWidth,
            height: that.data.canvasHeight,
          },
          headerMap: { //头像信息
            url: that.data.headerMap.url,
            x_axis: 220,
            y_axis: 390,
            width: 30,
            height: 30,
          },
          QRcode: { //二维码
            url: "/images/share/qrcode.jpg",
            x_axis: 5,
            y_axis: 440,
            width: 50,
            height: 50,
          },
          authorInfo: { //用户名
            name: that.data.authorInfo.name,
            x_axis: 255,
            y_axis: 409,
            size: 12,
            color: "rgba(0,0,0,.8)",
          },
          hint: { //长按二维码提示
            text: "长按识别二维码/查看更多植物故事",
            x_axis: 55,
            y_axis: 470,
            size: 12,
            color: "rgba(0,0,0,.8)",
          }
        });
        break;
      default:
        that.setCanvasMap(that.data.map.url, that.data.canvasWidth, 0, 0); //设置 图片信息
        that.setData({
          mapBg: { //背景图片信息
            url: "/images/share/modebg3.png",
            x_axis: 0,
            y_axis: 0,
            width: that.data.canvasWidth,
            height: that.data.canvasHeight,
          },
          headerMap: { //头像信息
            url: that.data.headerMap.url,
            x_axis: 160,
            y_axis: 310,
            width: 30,
            height: 30,
          },
          QRcode: { //二维码
            url: "/images/share/qrcode.jpg",
            x_axis: 5,
            y_axis: 440,
            width: 50,
            height: 50,
          },
          authorInfo: { //用户名
            name: that.data.authorInfo.name,
            x_axis: 195,
            y_axis: 329,
            size: 12,
            color: "rgba(0,0,0,.8)",
          },
          hint: { //长按二维码提示
            text: "长按识别二维码/查看更多植物故事",
            x_axis: 55,
            y_axis: 470,
            size: 12,
            color: "rgba(0,0,0,.8)",
          }
        });
    }
    that.drawMap(type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("页面传参数：",options)
    var that = this;
    //海报的设计稿件尺寸 750px*1044px
    var myCanvasWidth = 750 / 2 - 20,
      myCanvasHeight = 1044 / 2 - 20;
    that.setData({ //设置绘制海报图片数据
      pages: options.pages, //是否存在返回按钮
      recognitionName: options.recognitionName,
      recognitionid: options.recognitionid,
      canvasWidth: myCanvasWidth,
      canvasHeight: myCanvasHeight,
      map: {
        url: options.mapUrl,
      },
      headerMap: { //头像信息
        url: options.headerMap,
      },
      authorInfo: { //用户名
        name: options.name,
      },
    })
    console.log(that.data.resultLest)
    // this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that =this;
    setTimeout(function() {
      that.choseMode(0)
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  onShareAppMessage: function (res) {
    var that =this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title:"来看看这是不是"+that.data.recognitionName,
      path: '/pages/nearbyDetails/nearbyDetails?name=' + that.data.recognitionName + '&recognitionid=' + that.data.recognitionid + '&difference=2'
    }
  

  },
  // 绘制海报
  drawMap: function(type) {
    var that = this;
    // ----------定义canvas 画布----------
    const ctx = wx.createCanvasContext('share-map' + type);
    // ctx.save();
    // // ----------绘制画布的展示图片----------
    var map_width = that.data.map.width,
      map_height = that.data.map.height,
      map_bg = that.data.map.url,
      map_x_axis = that.data.map.x_axis,
      map_y_axis = that.data.map.y_axis;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        if (res.windowWidth < 375) {
          ctx.drawImage(map_bg, 0, 0, map_width * 1.5, map_height * 1.5, 0, 0, 355, 473);
        } else {
          ctx.drawImage(map_bg, map_width * 0.25, map_height * 0.3, map_width * 2, map_height * 2, 0, 0, 355, 473);
        }
      },
    })
    // ---------- 绘制画布背景----------
    var mapBg_width = that.data.mapBg.width,
      mapBg_height = that.data.mapBg.height,
      mapBg_bg = that.data.mapBg.url,
      mapBg_x_axis = that.data.mapBg.x_axis,
      mapBg_y_axis = that.data.mapBg.y_axis;

    ctx.drawImage(mapBg_bg, mapBg_x_axis, mapBg_y_axis, mapBg_width, mapBg_height);
    // ---------- 绘制画布的用户名----------
    var authorInfo_name = that.data.authorInfo.name,
      authorInfo_x_axis = that.data.authorInfo.x_axis,
      authorInfo_y_axis = that.data.authorInfo.y_axis,
      authorInfo_size = that.data.authorInfo.size,
      authorInfo_color = that.data.authorInfo.color;
    ctx.setFillStyle(authorInfo_color) //文字颜色
    ctx.setFontSize(authorInfo_size) //设置字体大小，
    ctx.fillText(authorInfo_name, authorInfo_x_axis, authorInfo_y_axis)
    // ---------- 绘制画布二维码旁边提示文字----------
    var hint_text = that.data.hint.text,
      hint_x_axis = that.data.hint.x_axis,
      hint_y_axis = that.data.hint.y_axis,
      hint_size = that.data.hint.size,
      hint_color = that.data.hint.color;
    ctx.setFillStyle(hint_color) //文字颜色
    ctx.setFontSize(hint_size) //设置字体大小，
    ctx.fillText(hint_text, hint_x_axis, hint_y_axis)
    // ---------- 绘制画分享二维码----------
    var code_width = that.data.QRcode.width,
      code_height = that.data.QRcode.height,
      code_bg = that.data.QRcode.url,
      code_x_axis = that.data.QRcode.x_axis,
      code_y_axis = that.data.QRcode.y_axis;
    ctx.drawImage(code_bg, code_x_axis, code_y_axis, code_width, code_height);
    // ---------- 绘制画布的用户头像----------
    var headerMap_width = that.data.headerMap.width,
      headerMap_width = that.data.headerMap.height,
      headerMap_bg = that.data.headerMap.url,
      headerMap_x_axis = that.data.headerMap.x_axis,
      headerMap_y_axis = that.data.headerMap.y_axis;
    //画圆
    ctx.arc(headerMap_x_axis + (headerMap_width / 2), headerMap_y_axis + (headerMap_width / 2), headerMap_width / 2, 0, 2 * Math.PI, true);
    //从画布上裁剪出这个圆形
    ctx.setStrokeStyle('#fff')
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(headerMap_bg, headerMap_x_axis, headerMap_y_axis, headerMap_width, headerMap_width);
    // ---------- 绘制画布----------
    ctx.draw()
    console.log("又画了一次")
  },
  //点击保存图片
  saveMap: function() {
    var index = this.data.curentIndex
    wx.canvasToTempFilePath({
      canvasId: 'share-map' + index,
      fileType: 'jpg',
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
            });
          },
          fail() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  back:function(){
    wx.reLaunch({
      url: '../../nearby/nearby',
    })
  }

})