const myRequest = require("utils/httpService.js");  
const apis = require("api/index.js");
const utils = require("utils/util.js");
//app.js
App({
  onLaunch: function () {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse('getUpdateManager')) {
      //创建 UpdateManager 实例
      const updateManager = wx.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(function() {
            //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            updateManager.applyUpdate();
          })
          updateManager.onUpdateFailed(function() {
            // 新版本下载失败
            wx.showModal({
              title: '已经有新版本喽~',
              content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
            })
          })
        }
      })
    } else {
      //TODO 此时微信版本太低（一般而言版本都是支持的）
      wx.showModal({
        title: '溫馨提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    let _this = this;
    // 登录
    wx.login({
      success: res => {
        console.log('登录',res.code)
        if (res.code) {
          //发起网络请求
          console.log(_this.globalData.apis)
          let params = {
            code:res.code
          }
          wx.request({
            url: _this.globalData.myRequest.commonUrl+'api/app/wechat/authorize',
            data:params,
            method:'POST',
            header:{
              'content-type':'application/json', // 默认值
              'X-Sinochem-Info': 'c_p=property_mp',
            },
            success (res) {
              // wx.hideLoading()
              if(res.data.status == 200){
                wx.setStorageSync('openId', res.data.data.openId);
              }
            },
            fail(res){
              // wx.hideLoading()
              console.log(res);
            }
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  getOpenId(){
    let _this = this;
    var promise = new Promise(function(resolve,reject){
      wx.login({
        success: res => {
          // console.log('登录',res.code)
          if (res.code) {
            //发起网络请求
            console.log(_this.globalData.apis)
            let params = {
              code:res.code
            }
            wx.request({
              url: _this.globalData.myRequest.commonUrl+'api/app/wechat/authorize',
              data:params,
              method:'POST',
              header:{
                'content-type':'application/json', // 默认值
                'X-Sinochem-Info': 'c_p=property_mp',
              },
              success (res) {
                // wx.hideLoading()
                if(res.data.status == 200){
                  wx.setStorageSync('openId', res.data.data.openId);
                  // console.log('登录openid=====',res.data.data.openId)
                 
                  resolve(res.data.data.openId);
                }
              },
              fail(res){
                // wx.hideLoading()
                reject(res)
                console.log(res);
              }
            })
          }
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    });
    return promise;
  },
  globalData: {
    userInfo: null,
    myRequest:myRequest,
    apis:apis,
    tool:utils
  }
})