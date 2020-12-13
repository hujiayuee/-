//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
 sentence1Code:' ',
   sentence1Result:[]
  },
 
  onLoad: function () {
    self = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
test:function(){
  wx.request({
    url:'http://api.tianapi.com/txapi/dictum/index',
    mothed:'GET',
    data:{
      key:'98a8fe913efdbe497befeea8eafc47bd',
      num:7
    },
    success:res=>{
      console.log(res.data)
      self.setData({
        sentence1Code:res.data.codePointAt,
        sentence1Result:res.data.newslist
      })
    }
  })
}
})
