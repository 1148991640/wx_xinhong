// pages/address/address.js
Page({
  data: {
    address: {
      name: '',
      phone: '',
      detail: ''
    }
  },
  onLoad() {
    var self = this;

    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data
        })
      }
    })
  },
  formSubmit() {
    var self = this;
    if (self.data.address.name && self.data.address.phone && self.data.address.detail) {
      wx.setStorage({
        key: 'address',
        data: self.data.address,
        success() {
          wx.navigateBack();
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写收货人资料',
        showCancel: false
      })
    }
  },
  bindName(e) {
    console.log(e)
    this.setData({
      'address.name': e.detail.value
    })
  },
  bindPhone(e) {
    console.log(e)
    this.setData({
      'address.phone': e.detail.value
    })
  },
  bindDetail(e) {
    console.log(e)
    this.setData({
      'address.detail': e.detail.value
    })
  }
})