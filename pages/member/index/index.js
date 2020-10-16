
// var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    activeNames: [0]
  },
  getUserInfo: function (e) {
    const app = getApp()
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  navigateToAddress: function () {
    wx.navigateTo({
      url: '/pages/address/address',
    });
  },

  navigateToOrder: function (e) {
    var status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '../../order/list/list?status=' + status
    });
  },

  callTel: function (e) {
    wx.navigateTo({
      url: '/pages/member/kefu/kefu',
    })
  },
  navigateToAboutus: function (e) {
    wx.navigateTo({
      url: '/pages/member/aboutus/aboutus',
    })
  },
  foot: function () {
    wx.navigateTo({
      url: '/pages/member/zuji/zuji',
    })
  },

  onShareAppMessage() {
    return {
      title: "新鸿医疗器械小程序"
    }
  }
})