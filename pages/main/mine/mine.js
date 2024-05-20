// pages/main/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '立即登录',
    bar_Height: wx.getSystemInfoSync().statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    let token = wx.getStorageSync('tokenNewMp')
    if (!!token && token != 'undefined') {
      let phone = wx.getStorageSync('phone')
      this.setData({
        phone: phone
      })
    }
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
  urlGoWx() {
    var h5url = `https://hjh5.jinmaowy.com/a/agreement/dahuiyuan.html`
    wx.navigateTo({
      url: `/pages/ttpark/park?h5url=${encodeURIComponent(h5url)}`,
    });
  },
  PrivacyAgreement() {
    wx.showToast({
      title: '开发中...',
      icon: "none",
      duration: 1500
    })
  },
  loginAction() {
    let token = wx.getStorageSync('tokenNewMp')
    if (!!token) {
      return
    }
    console.log('loginAction')
    wx.navigateTo({
      url: '/pages/main/login/login',
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