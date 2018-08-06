// components/identify/identify.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    identifications:{
      type:Array
    },
    identificationId: {
      type: Number,
      value: 0
    },
    recognitionId:{
      type: Number,
      value: 0
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
    _identifyDetail(e) {
      // console.log(e)
      this.setData({
        identificationId: e.currentTarget.dataset.identificationid,
        recognitionId: e.currentTarget.dataset.recognitionid
      })
      this.triggerEvent("identifyDetail", { 'identificationId': this.data.identificationId, 'recognitionId': this.data.recognitionId})
    },

  }
})
