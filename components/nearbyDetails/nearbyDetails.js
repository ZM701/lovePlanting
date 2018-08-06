// components/nearbyDetails/nearbyDetails.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataInfo: {
      type: Object,
      value: ""
    },
    month: {
      type: String,
      value: ""
    },
    season: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    remarkContent: {
      type: Object
    },
    uid: {
      type: Number
    },
    difference: {
      type: Number
    },
    personid: {
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
    //跳转到更多评论的页面
    _more() {
      this.triggerEvent("more")
    },
    //跳转到个人主页
    _personalPage(e) {
      // console.log(e)
      this.setData({
        uid: e.currentTarget.dataset.uid
      })
      this.triggerEvent("personalPage", this.data.uid)
    },
    //关注
    _attention() {
      this.triggerEvent("attention")
    },
    //取消关注
    _cancleAttention() {
      this.triggerEvent("cancleAttention")
    },
    //得到评论文本框的值
    content(e) {
      this.setData({
        content: e.detail.value
      })
    },
    //点击评论
    _remark() {
      this.triggerEvent("remark", this.data.content)
    },
    //点击确认是此植物
    _confirmPlant() {
      this.triggerEvent("confirmPlant");
    },
    //点击生成我的足迹
    _generateFoot() {
      this.triggerEvent("generateFoot")
    },
    //跳转到个人主页
    _person(e) {
      this.setData({
        uid: e.currentTarget.dataset.uid
      })
      this.triggerEvent("person", this.data.uid)
    }

  }
})
