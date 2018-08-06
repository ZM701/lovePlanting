// components/personalPage/personalPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    members:{
      type:Object
    },
    foot:{
      type:Object
    },
    footLength:{
      type:Number
    },
    locationId:{
      type: Number
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击返回上一层
    _back() {
      this.triggerEvent("back")
    },
    //点击足迹
    _footprintDetail(e) {
      // console.log(e)
      this.setData({
        locationId: e.currentTarget.dataset.locationid
      })
      this.triggerEvent("footprintDetail", this.data.locationId)
    },
    //点击鉴别
    _identify(){
      this.triggerEvent("identify")
    }
  }
})
