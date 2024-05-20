// pages/ttpark/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '支付',
    });

    var data = JSON.parse(decodeURIComponent(options.data || '{}'));
    if (!data.timeStamp || !data.nonceStr || !data.package || !data.paySign) {
      wx.showModal({
        title: '提示',
        content: '缺少支付参数',
        showCancel: false,
        complete: () => {
          wx.navigateBack();
        }
      });
			return;
		}
		wx.requestPayment({
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package, 
			signType: data.signType, 
			paySign: data.paySign, 
			success: () => {
        wx.navigateBack();
			},
			cancel: () => {
        // 支付取消时，cancel和fail回调都会执行
        // wx.navigateBack();
			},
			fail: () => {
        wx.navigateBack();
			}
		});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})