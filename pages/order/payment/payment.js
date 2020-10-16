
const app = getApp()
Page({
  data: {
    cate: [],
    index: 0,
    imgUrl: app.globalData.imgUrl,
    address: {},
    hasAddress: false,
    price: '',
    orders: []
  },
  onLoad(e) {
    console.log(e);
    console.log(app.globalData)
    let carts = wx.getStorageSync("carts");
    let orders=[];
    for(let i in carts){
      if (carts[i].selected){
        orders.push(carts[i])
      }
    }

    this.setData({ orders:orders })

  },

  onReady() {

  },

  onShow: function () {
    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
    self.getTotalPrice();
  },

  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },
  toPay() {
    if (this.data.hasAddress) {
      wx.request({
        url: app.globalData.host + 'Orders/addOrders',
        data: {
          goods: this.data.orders,
          openId: wx.getStorageSync('openid'),
          address: this.data.address,
        },
        success: function (res) {
          console.log(res)
          let arr = wx.getStorageSync("carts");
          let carts = [];
          for (let i in arr) {
            if (!arr[i].selected) {
              carts.push(arr[i])
            }
          }
          wx.setStorageSync("carts", carts)
          wx.showModal({
            title: '提示',
            content: '提交成功',
            complete() {
              wx.navigateTo({
                url: '../list/list'
              })
            }
          })
        }
      })

    } else {
      wx.showToast({
        title: '请填写收货信息',
      })
    }

  },


  formSubmit: function (e) {
    console.log(e);
    let classify = this.data.classify_name
    let price = e.detail.value.price
    let flavor = e.detail.value.flavor
    if (!this.data.hasAddress) {
      wx.showToast({
        title: '请填写收货信息',
      })
      return
    }
    if (!flavor) {
      wx.showToast({
        title: '请填写口味',
      })
      return
    }
    if (!price) {
      wx.showToast({
        title: '请填写预期价位',
      })
      return
    }


    wx.request({
      url: host + '/Api/Orders/addOrders',
      data: {
        cate: this.data.orders,
        openId: wx.getStorageSync('openId'),
        address: this.data.address,
        classify: classify,
        price: price,
        flavor: flavor
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '提交成功',
          complete() {
            wx.switchTab({
              url: '/pages/mine/mine'
            })
          }
        })
      }
    })

  }
})