const app=getApp();
Page({
	data: {
		orders: [],
	},
	onLoad: function (options) {
    console.log(options)
		// 订单状态，已付为0，已发货为1，已收货为2
		var status = parseInt(options.status);
		// 存为全局变量，控制支付按钮是否显示
		this.setData({
			status: status,
      openid: wx.getStorageSync("openid")
		});
	},
	onShow: function() {
    this.getOrders();
	},
  getOrders: function () {
    var self = this;
    wx.request({
      url: app.globalData.host + 'Orders/getOrders',
      data:{openid:self.data.openid,status:self.data.status},
      success: res => {
        console.log(res);
        self.setData({
          orders: res.data.orders
        });
      }
    })
  },
	/*pay: function(e) {
		var objectId = e.currentTarget.dataset.objectId;
		var totalFee = e.currentTarget.dataset.totalFee;
		wx.navigateTo({
			url: '../payment/payment?orderId=' + objectId + '&totalFee=' + totalFee
		});
	},*/
  //取消订单
  cancelOrders: function (res) {
    console.log(res)
    var id = res.target.id;
    var openid = wx.getStorageSync("openid");
    var self = this;
    wx.request({
      url: app.globalData.host + 'Orders/cancelOrders',
      data: { id: id, openid: openid },
      success: e => {
        console.log(e)
        if (e.data.code == 0) {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '操作成功！',
          })
          self.getOrders()
        } else {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '操作失败！',
          })
        }
      }
    })

  },
  //收货
  receOrders: function (res) {
    console.log(res)
    var id = res.target.id;
    var openid = wx.getStorageSync("openid");
    var self = this;
    wx.request({
      url: app.globalData.host + 'Orders/receOrders',
      data: { id: id, openid: openid },
      success: e => {
        console.log(e)
        if (e.data.code == 0) {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '操作成功！',
          })
          self.getOrders()
        } else {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '操作失败！',
          })
        }
      }
    })

  },
  evaOrders: function (res) {
    console.log(res)
    var id = res.target.id;
    wx.navigateTo({
      url: '../eva/eva?id=' + id,
    })

  }
});