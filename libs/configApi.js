// 服务器请求地址
var serverHost = {
  // zhipai: "http://192.168.1.165:9003"
  zhipai: "https://nwsapi.nanniwan.com/recognition"
};

// 定义接口
var configApi = {
  getHotSearch: getServerUrl("/commons/hot_search.api"),   //获取 通用-热搜
  getSearch: getServerUrl("/commons/search.api"),   //获取 通用-搜索
  getSearchPlant: getServerUrl("/commons/search_recognition.api"),  //通用-搜索识别相关信息 列表
  getRecognitions: getServerUrl("/recognitions/list.api"),  //获取 附近的识别列表
  getNearDetail: getServerUrl("/recognitions/get.api"),  //识别 - 获取识别详情，包括鉴定信息
  getAttention: getServerUrl("/members/follow.api"),   //会员-关注
  getCancleAttention: getServerUrl("/members/unfollow.api"),   //会员-取消关注
  getArticleDetail: getServerUrl("/commons/get_article.api"),   //通用-文章详情
  getLocationsDetail: getServerUrl("/locations/get.api"),   //通用-获取足迹详情
  getIdentifications: getServerUrl("/identifications/list.api"),   //鉴定 - 获取鉴定列表
  hotlist: getServerUrl("/identifications/hotlist.api"),   //获取热门鉴定（4条）
  getIdentifiDetail: getServerUrl("/identifications/get.api"),   //鉴定 - 获取鉴定信息
  getRecommend: getServerUrl("/locations/list.api"),   //足迹 - 获取足迹列表，陌生人发布的(推荐)
  getFollowed: getServerUrl("/locations/followed_list.api"),   //足迹 - 获取足迹列表，关注人发布的(关注)
  getRemark: getServerUrl("/recognitions/add_comment.api"),  //识别 - 添加评论
  getComments: getServerUrl("/recognitions/comments.api"),  //识别 - 评论
  getInterest: getServerUrl("/members/get_interestingUsers.api"),  //会员--感兴趣的人列表
  getMembers: getServerUrl("/members/info.api"),  //会员 - 获取会员个人信息
  getFolow: getServerUrl("/members/following.api"),  //会员 - 关注列表
  getFans: getServerUrl("/members/followers.api"),  //会员 - 粉丝列表
  getHistory: getServerUrl("/members/recognitions.api"),  //会员 - 获取会员识别历史列表
  getFoot: getServerUrl("/members/locations.api"),  //会员 - 获取会员发布足迹列表
  getSaveFoot: getServerUrl("/locations/save.api"), //足迹 - 发布足迹
  getDelHistory: getServerUrl("/recognitions/delete.api"), //识别 - 删除识别图片
  getDelFoot: getServerUrl("/locations/del_location.api"), //识别 - 删除足迹
  getIdentification: getServerUrl("/recognitions/identify.api"),//求鉴定  
  getPlantInfo: getServerUrl("/commons/plant_info.api"),//通用-获取植物信息
  getConfirmPlant: getServerUrl("/recognitions/update.api"),//识别 - 更新识别结果
  getSave: getServerUrl("/recognitions/save.api"),//识别图片
  getAdvs: getServerUrl("/commons/ad_contents.api"),//获取广告内容列表
  getPresonIdentify: getServerUrl("/identifications/identification_list.api"),//鉴定 - 个人求鉴定列表
  getPresonInfo: getServerUrl("/members/update_info.api"),//会员-更新个人信息
  getsearchplants: getServerUrl("/commons/search_plant.api"),//通用-模糊搜索植物库
  getPost: getServerUrl("/commons/post_image.api"),//通用-贡献植物库
  getCancalResult: getServerUrl("/identifications/cancal_result.api"),// 取消鉴定  
  getCode: getServerUrl("/commons/qrcode.api"),//识别二维码
  // login: "http://192.168.1.160:1020/user/wx_xcx_login.api"    //登录接口
  upData: getServerUrl("/recognitions/update.api"),//确认是此植物
  login: "https://api.nanniwan.com/user/wx_xcx_login.api"
};

// 获取服务器地址
function getServerUrl(path) {
  return serverHost.zhipai + path;
};

module.exports = configApi;









