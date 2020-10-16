var app = getApp()
Page( {
  onShareAppMessage: function () {
    return {
      title: '快分享给你的朋友吧',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  
  data: {
    order:"rand",
    goods:[],
    total: null,
    page:1,
    lastPage: null,
    inputShowed: false,
    inputVal: "",
    imgUrl:app.globalData.imgUrl,
    imgUrls: [
      '../../images/lunbo1.jpg',
      '../../images/lunbo2.jpg',
      '../../images/lunbo3.jpg',
      '../../images/lunbo4.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',

    animationNotice: {}
  },
  chooseActive:function(e){
    console.log(e)
    let self=this;
    self.setData({
      order:e.currentTarget.id,
      goods:[],
      page:1
    })
    self.getGoods()
  },
  goCategory(e){
    console.log(e)
    wx.setStorageSync("cid", e.currentTarget.id)
    wx.switchTab({
      url: '/pages/category/category',
    })
  },
  search: function () {
    var self = this;
    var q = self.data.inputVal;
    self.hideInput();

    wx.navigateTo({
      url: '../search/search?q=' + q,
    })
  },
  goDetail:function(e){
    console.log(e)
    let id=e.currentTarget.id
    wx.navigateTo({
      url: '../goods/detail/detail?id='+id,
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onReady: function() {

  },
  onLoad: function() {
    var me = this;
    var animation = wx.createAnimation( {
      duration: 400,
      timingFunction: 'ease-out',
    });
    me.animation = animation;
    wx.getSystemInfo( {
      success: function( res ) {
        me.setData( { windowWidth: res.windowWidth })
      }
    });

    console.log( 'onLoad' );
   
  },
  onShow(){
    let self=this;
    self.setData({page:1})
    self.getCate()
    self.getGoods()
  },
  getCate(){
    let self = this;
    wx.request({
      url: app.globalData.host+'index/getIndexCate',
      success:function(e){
        self.setData({cate1:e.data.cate1,cate2:e.data.cate2})
      }
    })
  },
   getGoods() {
    let self = this;
    wx.request({
      url: app.globalData.host + 'goods/getGoods',
      data:{page:self.data.page,order:self.data.order},
      success: function (e) {
        self.setData({ 
          goods: self.data.goods.concat(e.data.goods.data),
          total:e.data.goods.total,
          page:e.data.goods.current_page,
          lastPage:e.data.goods.last_page
         })
      }
    })
  },
  onReachBottom: function () {
    let self = this;
    if (self.data.lastPage == self.data.page) {
      wx.showModal({
        title: '提示',
        content: '无更多商品！',
        //showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('asdfasd')
            wx.pageScrollTo({
              scrollTop: 10,
              duration: 0,
            })
          }
        }
      })
    } else {
      self.setData({
        page: self.data.page + 1
      })
      self.getGoods()
    }
  }

})
