
App({
	onLaunch: function () {
        var self=this;
        if(!wx.getStorageSync("openid")){
          self.login()
        }
    wx.removeStorageSync("zuji")
		// 设备信息
		wx.getSystemInfo({
			success: function(res) {
				self.screenWidth = res.windowWidth;
				self.screenHeight = res.windowHeight;
				self.pixelRatio = res.pixelRatio;
			}
		});
	},
  login:function(){
    let self=this;
    wx.login({
      success: function (res) {
        //console.log(res)
        wx.request({
          url: self.globalData.host + 'index/getOpenId',
          data: { js_code: res.code },
          success: function (e) {
            //console.log(e)
            wx.setStorageSync("openid", e.data.openid)
          }
        })
      }
    });
  },
  globalData: {
    // host: "http://localhost/xinhong.ink/public/index.php/api/",
    // imgUrl:"http://localhost/xinhong.ink/public/Uploads/",
    host: "http://xinhong.ink/api/",
    imgUrl:"http://xinhong.ink/Uploads/",
    carts: [
     
    ],
  }
})
