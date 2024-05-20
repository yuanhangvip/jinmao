// pages/main/codeLogin/codeLogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAgreement:false,
    loginForm:{
      phone:'',//电话号
      smsCode:'',//手机验证码
    },//登录信息
    isSendSMSCode:false,//是否可以发送验证码
    captchaVal:60,//剩余时间
    isLogin:false,//是否可以登录
    timer:null,
    commonUrl:{},//接口地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.commonUrl = app.globalData.apis.default;
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

  codeBtnAction(){
    console.log('codeBtnAction')
  },

  // backBtnAction(){
  //   wx.navigateBack({
  //     delta:1
  //   })
  // },

  onSubmit() {
    console.log(this.data.loginForm)
    if (!this.validPhone(this.data.loginForm.phone)) {
      wx.showToast({
        title: '请正确填写手机号',
        icon:"none",
        duration:1500
      })
      return;
    };

    if(!this.data.loginForm.smsCode){
      wx.showToast({
        title: '请输入验证码',
        icon:"none",
        duration:1500
      })
      return false;
    }

    if(!this.data.showAgreement){
      wx.showToast({
        title: '请勾选同意用户协议',
        icon:"none",
        duration:1500
      })
      return false;
    }
    wx.showLoading({
       title: '加载中',
    })
    let params = {
      username: this.data.loginForm.phone+'#c',
      openId:wx.getStorageSync('openId'),
      smsCode:this.data.loginForm.smsCode,
      grant_type:'sms_code'
  }
    this.commonUrl.login.bindPhone({
      data:params,
      success:(res)=>{
        console.log(res)
        if(!!res.access_token){
          wx.setStorageSync('tokenNewMp','Basic '+res.access_token)
          wx.setStorageSync('phone', res.sub)
          wx.showToast({
            title: '登录成功',
            icon:"none",
            duration:1500
          })
          wx.navigateBack({
            delta: 2,
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.message,
            showCancel:false,
          })
        }
        wx.hideLoading()
      },
      fail:(res)=>{
        console.log(res)
        wx.showModal({
          title: '提示',
          content: res.message,
          showCancel:false,
        })
        wx.hideLoading()
      }
    })
  },

  //校验手机号
  validPhone(phone) {
    if (!phone.match(/^[0-9]*$/) || phone.length<11) {
      this.setData({
        phone_tit : true
      })
      return false;
    }
    return true
  },
  getPhone:function(e){
    let phone = e.detail.value;
    let phoneStr = 'loginForm.phone'
    this.setData({
      [phoneStr]:phone
    })
    console.log(this.data.loginForm.phone)
  },
  getsmsCode:function(e){
    let smsCode = e.detail.value;
    let smsCodeStr = 'loginForm.smsCode'
    this.setData({
      [smsCodeStr]:smsCode
    })
  },
  //获取验证码
  sendSmsCode(){
    console.log(this.data.loginForm.phone)
    if (!this.validPhone(this.data.loginForm.phone)) {
      wx.showToast({
        title: '正确填写手机号',
        icon:"none",
        duration:1500
      })
      return
    };
    let _this = this;
    wx.showLoading({
       title: '加载中',
    })
    // _this.data.isSendSMSCode = true;
    let params ={
      phone:_this.data.loginForm.phone,
      vCode:_this.data.loginForm.vCode
    }
    _this.commonUrl.login.sendSmsCode({
      data:params,
      success:(res) => {
        console.log(res)
        if(res.status == 200){
          wx.showToast({
            title:'发送成功',
            icon: 'none',
            duration: 2000,
          })
          _this.setData({
            isSendSMSCode:true
          })
          let timer = setInterval(() => {
            _this.setData({
              captchaVal:_this.data.captchaVal-1
            })
            if(_this.data.captchaVal === 0){
              clearInterval(timer)
              _this.setData({
                isSendSMSCode:false,
                captchaVal:60
              })
            }
          }, 1000)
          this.timer = timer
        }else{
          // if(res.status =='30101'){
            wx.showModal({
              title: '提示',
              content: res.message,
              showCancel:false,
              success:function(){
                // _this.getCaptchaCode()
              }
            })
          // }
        }
        wx.hideLoading()
      },
      fail:()=>{
        wx.hideLoading()
      }
    })
  },

  selAgreement(){
    let _this = this;
    this.setData({
     showAgreement:!_this.data.showAgreement
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