// pages/main/home/home.js
import {
  hex_md5
} from '../../../utils/md5.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: true,
    tipShow: false,
    bar_Height: wx.getSystemInfoSync().statusBarHeight,
    hasMoreData: true, // 是否还有更多数据
    option: [{
        text: '亦庄金茂悦',
        value: 0
      },
      {
        text: '亦庄金茂悦1',
        value: 1
      },
      {
        text: '亦庄金茂悦2',
        value: 2
      },
    ],
    value: 0,
    listData: [{
        id: 1,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 10
      },
      {
        id: 2,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 20
      },
      {
        id: 3,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 30
      },
      {
        id: 32,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 40
      },
    ],
    cloneListData: [{
        id: 4,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 10
      },
      {
        id: 5,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 20
      },
      {
        id: 6,
        name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
        num: 30
      },
    ],
    list: [{
        id: 1,
        title: '物管交费',
        text: '在线缴费更放心'
      },
      {
        id: 2,
        title: '报事报修',
        text: '线上报单超方便'
      },
      {
        id: 3,
        title: '周边信息',
        text: '便民信息都知道'
      }
    ]

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

  showAlert() {
    // this.setData({
    //   tipShow:true
    // })

    let token = wx.getStorageSync('tokenNewMp')
    if (!!token && token != 'undefined') { //进入h5页面

      var serverURL = 'https://jmtch.jinmaowy.com/MobileServer'; // 服务器地址（请填写实际的服务器地址）
      var pageURL = '/pages/index/index'; // 停车模块页面地址，支持传入参数(汉字和特殊字符需要编码)，例如 '/pages/fee/index?plate=%E4%BA%ACA12345',
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
      wx.navigateTo({
        url: `/pages/ttpark/park?h5url=${encodeURIComponent(h5url)}`,
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录后再缴费',
        cancelColor: '#666666',
        confirmText: '去登录',
        confirmColor: '#F8D1AC',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/main/login/login',
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },

  cancel() {

    this.setData({
      tipShow: false
    })

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
    this.setData({
      listData: [{
          id: 1,
          name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
          num: 10
        },
        {
          id: 2,
          name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
          num: 20
        },
        {
          id: 3,
          name: '凤凰城社区帮助孤寡老人，传递社会爱心主题活动....',
          num: 30
        },
      ],
    });
  },
  onPageScroll(e) {
    // console.log(e, 'e');
    if (e.scrollTop > 178) {
      this.setData({
        selectShow: false
      })
    } else {
      this.setData({
        selectShow: true
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMoreData) {
      this.loadMoreData();
    }
  },
  loadMoreData() {
    // 模拟加载更多数据的函数
    setTimeout(() => {
      // 这里应该是请求后端接口获取新数据的逻辑
      // 假设这是从服务器获取的新数据
      const newData = [...this.data.cloneListData];

      // 将新数据添加到已有数据中
      this.setData({
        listData: [...this.data.listData, ...newData],
      });

      // 判断是否还有更多数据
      console.log()
      if (this.data.listData.length > 15) {
        this.setData({
          hasMoreData: false
        });
      }
    }, 1000); // 假设加载数据需要1秒
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})