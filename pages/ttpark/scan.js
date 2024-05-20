// pages/ttpark/scan.js
import {
  hex_md5
} from '../../utils/md5.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let qrcode = options.q;
    wx.showLoading({
      title: '正在加载',
    })
    let _openid = wx.getStorageSync('openId')
    if(_openid != 'logs' && !!_openid && _openid != 'undefined'){
      wx.hideLoading()
      this.enterH5Page(qrcode);  
    } else {
      app.getOpenId().then((v)=>{
        wx.hideLoading()
        this.enterH5Page(qrcode);  
      })
    }
    // setTimeout(() => {
    //   wx.hideLoading()
    //   this.enterH5Page(qrcode);  
    // }, 1500);
    
  },

  // 进入停车H5页面
  enterH5Page: function (qrcode) {
    // 停车模块页面地址
    // var pageURL = `/pages/scan/start-scan?qrcode=${qrcode}`;

    // 接入方式参考 pages/index/index 页面 
  
    var serverURL = 'https://jmtch.jinmaowy.com/MobileServer'; // 服务器地址（请填写实际的服务器地址）
    var pageURL = `/pages/scan/start-scan?qrcode=${qrcode}`;
    var appID = wx.getAccountInfoSync().miniProgram.appId; // 当前小程序appID
    var openID = wx.getStorageSync('openId'); // 用户openID（必传项）
    var phone = wx.getStorageSync('phone') // 建议传入手机号；若为空，则进入停车H5界面后，会要求绑定手机号；
    var wxlitePayPageURL = '/pages/ttpark/pay'; // 小程序支付页面path
    var payDataName = 'data'; // 对应于pay.js中的options.data
    var timestamp = new Date().getTime(); // 毫秒
    var key = hex_md5(openID + appID + timestamp + "_bl"); // md5
    let h5url = `${serverURL}/web/sdk/index_wxlite.html?pageURL=${encodeURIComponent(pageURL)}&appID=${appID}&openID=${openID}&phone=${phone}&wxlitePayPageURL=${encodeURIComponent(wxlitePayPageURL)}&payDataName=${payDataName}&timestamp=${timestamp}&key=${key}`;
    console.log(appID)
    console.log(openID)
    console.log(phone)
    console.log(key)
    console.log(h5url)
    wx.redirectTo({
      url: `/pages/ttpark/park?h5url=${encodeURIComponent(h5url)}`,
    });

    
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