// components/article/article.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //接收过来的属性
    searchPlant:{
      type: Object,
      value: {}
    },
    searchArticle: {
      type: Object,
      value: {}
    },
    searchLocation: {
      type: Object,
      value: {}
    },
    name:{
      type:String
    },
    id:{
      type:Number,
      value:0
    },
    locationId:{
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
    //植物列表页
    _findDetail(e){
      this.setData({
        name: e.currentTarget.dataset.name
      })
      this.triggerEvent("findDetail",this.data.name)
    },
    //跳转到文章详情页
    _articleDetail(e){
      this.setData({
        id: e.currentTarget.dataset.id
      })
      this.triggerEvent("articleDetail",this.data.id)
    },
    //跳转到足迹详情页
    _locationDetail(e){
      this.setData({
        locationId: e.currentTarget.dataset.locationid
      })
      this.triggerEvent("locationDetail", this.data.locationId)
    }
  }
})
