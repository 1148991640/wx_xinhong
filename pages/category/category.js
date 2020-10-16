// pages/category/category.js
const app = getApp();
Page({
  data: {
    currentIndex: 0,
    imgUrl: app.globalData.imgUrl,
    order: "rand",
    goods: [],
    total: null,
    page: 1,
    lastPage: null,
    inputShowed: false,
    inputVal: "",
    imgUrl: app.globalData.imgUrl,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',

    animationNotice: {},
    chooseActive: function (e) {
      console.log(e)
      let self = this;
      self.setData({
        order: e.currentTarget.id,
        goods: [],
        page: 1
      })
      self.getGoods()
    },

  },
  goCategory(e) {
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
  goDetail: function (e) {
    console.log(e)
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../goods/detail/detail?id=' + id,
    })
  },
  showInput: function () {
    console.log('123')
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
  onReady: function () {

  },
  onLoad: function () {
    var me = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out',
    });
    me.animation = animation;
    wx.getSystemInfo({
      success: function (res) {
        me.setData({ windowWidth: res.windowWidth })
      }
    });

    console.log('onLoad');

  },
  onShow() {
    let self = this;
    self.setData({ page: 1 })
    self.getCate()
    self.getGoods()
  },
  getCate() {
    let self = this;
    wx.request({
      url: app.globalData.host + 'index/getIndexCate',
      success: function (e) {
        self.setData({ cate1: e.data.cate1, cate2: e.data.cate2 })
      }
    })
  },
  getGoods() {
    let self = this;
    wx.request({
      url: app.globalData.host + 'goods/getGoods',
      data: { page: self.data.page, order: self.data.order },
      success: function (e) {
        self.setData({
          goods: self.data.goods.concat(e.data.goods.data),
          total: e.data.goods.total,
          page: e.data.goods.current_page,
          lastPage: e.data.goods.last_page
        })
      }
    })
  },
  pud: function (e) {
    console.log(e)
    var img = e.currentTarget.dataset.img,
      text = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../news/news?img=' + img + '&text=' + text
    })
  },
  onLoad: function (options) {

    /* this.setData({
         categoryData:categoryData.default.data
     })*/


  },
  getCate() {
    let self = this;
    wx.request({
      url: app.globalData.host + 'index/getCate',
      success: function (e) {
        self.setData({ cate: e.data.cate })
        if (wx.getStorageSync('cid')) {
          self.getCateGoods(wx.getStorageSync('cid'));
          //遍历分类，确定当前ID所在序列，并设置为当前
          let cate = self.data.cate;
          for (let index in cate) {
            if (cate[index].id == wx.getStorageSync('cid')) {
              self.setData({ currentIndex: index });
              break;
            }
          }
        } else {
          self.getCateGoods(e.data.cate[0].id);
        }
      }
    })
  },
  getCateGoods(cid) {
    let self = this;
    wx.request({
      url: app.globalData.host + 'goods/getCateGoods',
      data: { cid: cid },
      success: function (e) {
        self.setData({ goods: e.data.goods })
      }
    })

  },
  onAside: function (options) {
    let self = this
    //下标
    var index = options.currentTarget.dataset.index;
    console.log(index)
    self.setData({
      currentIndex: index
    });
    self.getCateGoods(self.data.cate[self.data.currentIndex].id);

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    let self = this;

    self.getCate();
  },
  onHide: function () {
    wx.removeStorageSync("cid")
    this.setData({
      currentIndex: 0
    });
  },
  onUnload: function () {
    // 页面关闭
  }
})