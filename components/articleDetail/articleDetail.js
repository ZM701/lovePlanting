// components/articleDetail/articleDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleInfo:{
      type:Object,
      value:{}
    },
    article_contents:{
      type:Object
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
    _back(){
      this.triggerEvent("back")
    },
    //跳转到更多评论的页面
    _more(){
      this.triggerEvent("more")
    },
    //跳转到个人主页
    _personalPage(){
      this.triggerEvent("personalPage")
    }
  }
})
