// pages/main/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAgreement:false,
    userInfo:'',
    commonUrl:"",
    tool:'',
    tipShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.commonUrl = app.globalData.apis.default;
    this.tool = app.globalData.tool;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  urlGoWx(){
    var h5url = `https://hjh5.jinmaowy.com/a/agreement/dahuiyuan.html`
    wx.navigateTo({
      url: `/pages/ttpark/park?h5url=${encodeURIComponent(h5url)}`,
    });
  },

  quickLogin(){
    if(!this.data.showAgreement){
        wx.showToast({
          title: '请勾选同意用户协议',
          icon:"none",
          duration:1500
        })
        return;
    }
    this.setData({
      tipShow:true
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    // wx.getUserProfile({
    //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     this.setData({
    //       tipShow:true
    //     })
    //   },
    //   fail: (res) => {
    //     this.setData({
    //       tipShow:true
    //     })
    //   }
    // })
  },
  cancel(){
    this.setData({
      tipShow:false
    })
  },
  getPhoneNumber(e){
    console.log('111', e)
    console.log(e.detail.code)
    this.setData({
      tipShow:false
    })
    wx.showLoading({
       title: '加载中',
    })
    let params = {
      code:e.detail.code
    }
    this.commonUrl.home.getUserPhoneNumber({
      data:params,
      success:(res) => {
        console.log(res)
        if (res.status !== 200) {
          wx.hideLoading()
          wx.showModal({
            content: res.message,
          })
          return
        }
        //密钥
        const key = 'No cross, no crown.'
        //加密
        let str = JSON.stringify({
          "username":`${res.data.purePhoneNumber}#c`,
          "openId":wx.getStorageSync("openId"),
          "timestamp":res.data.timeStamp
        })
        console.log(str)
        let cipher = this.tool.encrypt(str, key)
        console.log(cipher)
        this.commonUrl.home.passwordFree({
          data:{"username": cipher},
          success:(dataInfo)=>{
            console.log(dataInfo)
            if(!!dataInfo.access_token){
              wx.setStorageSync('tokenNewMp','Basic '+dataInfo.access_token)
              wx.setStorageSync('phone', dataInfo.sub)
              wx.showToast({
                title: '登录成功',
                icon:"none",
                duration:1500
              })
              wx.navigateBack({
                delta: 1,
              })
            }else{
              wx.showModal({
                title: '提示',
                content: dataInfo.message,
                showCancel:false,
              })
            }
            wx.hideLoading()
          },
          fail:(dataInfo)=>{
            wx.hideLoading()
            wx.showModal({
              content: dataInfo.message,
            })
          }
        })
      },
      fail:(res)=>{
        wx.hideLoading()
        wx.showModal({
          content: res.message,
        })
      }
    })
  },
  selAgreement(){
    let _this = this;
    this.setData({
     showAgreement:!_this.data.showAgreement
   })
  },
  codeLogin(){
    wx.navigateTo({
      url: '/pages/main/codeLogin/codeLogin',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})