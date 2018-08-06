// components/footprint/footprint.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    locationsInfo:{
      type:Object
    },
    page:{
      type:Number
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
    //关注
    _attention() {
      this.triggerEvent("attention")
    },
    //取消关注
    _cancleAttention() {
      this.triggerEvent("cancleAttention")
    },
    _generateFoot(){
      this.triggerEvent("generateFoot")  
    }

  }
})
