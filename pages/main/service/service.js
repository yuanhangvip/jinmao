// pages/main/service/service.js
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    listData: [{
        id: 1,
        name: '物管缴费'
      },
      {
        id: 2,
        name: '报事报修'
      },
      {
        id: 3,
        name: '社区活动'
      },
      {
        id: 4,
        name: '物业通知'
      },
    ],
    otherServer: [{
        id: 1,
        name: '物管缴费'
      },
      {
        id: 2,
        name: '报事报修'
      },
      {
        id: 3,
        name: '社区活动'
      },
      {
        id: 4,
        name: '物业通知'
      },
    ],

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

  },
  clickFun(e) {
    console.log(e.target.dataset);
    if (e.target.dataset.item.id !== 1) {
      Toast('当前业务正在开发中');
    } else {
      console.log('123');
      Dialog.alert({
        context: this,
        selector: '#myDialog',
        message: '请先登录小程序',
        confirmButtonText: '去登录',
        color: 'pink'
      }).then(() => {
        // on close
      });
    }
  }
})