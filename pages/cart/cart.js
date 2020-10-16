const app=getApp();
Page({
  data:{
    imgUrl:app.globalData.imgUrl,
    carts:'',
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled']
  },
  toPayment:function(){
    let self=this;
    if (self.data.total =="￥0.00"){
      wx.showModal({
        showCancel:false,
        title: '警告',
        content: '没有选择任何商品哦！',
      })
    }else{
      wx.navigateTo({
        url: '../order/payment/payment',
      })
    }
    
  },
  bindViewTap:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../goods/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  del(e){
    var self = this;
    var index = parseInt(e.currentTarget.dataset.index);//得到下标
    var carts = self.data.carts;
    carts.splice(index,1)
    wx.showToast({
      title: '删除成功',
    })
    self.setData({
      carts: carts,
    });
    wx.setStorageSync("carts", carts)
    self.sum()
  },
    bindMinus: function(e) {
      var self=this;
      var index = parseInt(e.currentTarget.dataset.index);//得到下标
      var num = self.data.carts[index].num;
   
      // 如果只有1件了，就不允许再减了
      if (num > 1) {
         num --;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 购物车数据
      var carts = self.data.carts;
      carts[index].num = num;
      // 按钮可用状态
      var minusStatuses = this.data.minusStatuses;
      minusStatuses[index] = minusStatus;
      // 将数值与状态写回
      self.setData({
        carts: carts,
        minusStatuses: minusStatuses
      });
      wx.setStorageSync("carts", carts)
      self.sum()
  },
  bindPlus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    
    var num = this.data.carts[index].num;
    // 自增
    num ++;
    
    // 只有大于一件的m时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
     //console.log(minusStatuses[index])
    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
    wx.setStorageSync("carts", carts)
    this.sum()
  },
  bindCheckbox: function(e) {
    //绑定点击事件，将checkbox样式改变为选中与非选中
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
     carts: carts
    });
    wx.setStorageSync("carts", carts)
    this.sum()
  },
   bindSelectAll: function(e) { 
   // 环境中目前已选状态 
   var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作 
    selectedAllStatus = !selectedAllStatus; 
    // 购物车数据，关键是处理selected值 
    var carts = this.data.carts; 
    // 遍历 
    for (var i = 0; i < carts.length; i++) { 
        carts[i].selected = selectedAllStatus;
       } 
       this.setData({ 
        selectedAllStatus: selectedAllStatus,
         carts: carts 
      }); 
     wx.setStorageSync("carts", carts)
       this.sum()
   },
   bindCheckout: function(e) {
      // 初始化toastStr字符串
      var toastStr = 'cid:';
      // 遍历取出已勾选的cid
      for (var i = 0; i < this.data.carts.length; i++) {
        if (this.data.carts[i].selected) {
          toastStr += this.data.carts[i].cid;
          toastStr += ' ';
        }
      }
      //存回data
      this.setData({
        toastHidden: false,
        toastStr: toastStr
      });
    },
    bindToastChange: function(e) {
      this.setData({
        toastHidden: true
      });
  },
  //总价
  sum: function(e) {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
      total += carts[i].num * carts[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
    carts: carts,
    total: '￥' + (total).toFixed(2)
    });
},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.sum()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    let self=this
    self.setData({ carts: wx.getStorageSync("carts")})
    self.sum()
    if(self.data.carts.length==0){
      wx.showModal({
        title: '购物车空空如也',
        content: '现在去逛逛吧 ！！',
        complete:function(e){
          console.log(e)
          if(e.confirm){
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})