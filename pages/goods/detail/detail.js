const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    let id=e.id;
    let self=this;
    self.getGoodsInfo(id);
  },
  addCart(){
    let self=this;
    let goods=self.data.goods;
    goods.selected = true;
    goods.num = 1;
    
    var arr = wx.getStorageSync("carts")||[];
  
    console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].id == goods.id) {
          // 相等的话，给num+（即再次添加入购物车，数量++）  
          arr[j].num = arr[j].num +1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync("carts", arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          //self.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          wx.switchTab({
            url: '../../cart/cart',
          })
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync("carts", arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！!',
        icon: 'success',
        duration: 2000
      });
      wx.switchTab({
        url: '../../cart/cart',
      })
      return;
    } catch (e) {
      console.log(e)
    }

  },
  addZJ() {
    let self = this;
    let goods = self.data.goods;
    //console.log("goods:",goods)
    var arr = wx.getStorageSync("zj") || [];

    console.log("zj,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        
        if (arr[j].id == goods.id) {
          arr.splice(j, 1) 
          arr.push(goods);
          try {
            wx.setStorageSync("zj", arr)
          } catch (e) {
            console.log(e)
          }
         
          return;
        }
      }  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    try {
      wx.setStorageSync("zj", arr)
      return;
    } catch (e) {
      console.log(e)
    }
  },
  showCart(){
    wx.switchTab({
      url: '../../cart/cart',
    })
  },
  getGoodsInfo(id){
    let self = this;
    wx.request({
      url: app.globalData.host+'goods/getGoodsInfo',
      data:{id:id},
      success:function(e){
        self.setData({
          goods:e.data.goodsInfo
        })
        self.addZJ()
      }
    })
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