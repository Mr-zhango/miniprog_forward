// pages/search/search.js
import {Config} from "../../utils/config";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*index: 0,
    multiArray: [
                 ['纪念品', '文化','古籍','法律'],
                 ['钥匙扣', '中国政治','世界政治', '时政', '党政读物']
                 ],
    multiIndex: [0, 0],*/
    mHidden: true,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onRequest();
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

  },
  // 实际就是发送最终的值
   bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },



  buyTicket: function(e) {
      console.info("购买")


      // wx.request({
      //     url: Config.buy, //url
      //     method: 'POST', //请求方式
      //     header: {
      //         'Content-Type': 'application/json',
      //     },
      //     data: {
      //         productId: 111,  //参数
      //         productName: "product",  //参数
      //         productPrice: 0.01,  //参数
      //     },
      //     success: function(res) {
      //         // if (res.data.code == 1) {
      //         //     _this.setData({
      //         //         phone: res.data.user.phone,
      //         //         password: res.data.user.password
      //         //     })
      //         // }
      //     },
      //     fail: function() {
      //         app.consoleLog("请求数据失败");
      //     },
      //     complete: function() {
      //         console.info("请求完成")
      //     }
      // })
  }, 
  openCode: function (e) {
      console.info("打开二维码窗口")
      this.setData({
        mHidden:false
      })
    },
  changeModel: function (e) {
    console.info("确定关闭二维码窗口")
    this.setData({
      mHidden: true
    })
  },
  modelCancel: function (e) {
    console.info("点击取消关闭二维码窗口")
    this.setData({
      mHidden: true
    })
  },
  onRequest() {
    wx.request({
      url: 'http://localhost:8080/product/all',
      method: "POST",
      header: {
        'Content-Type': 'json',
        'token': 'o2aHu0H12zKzroLqx26-Fa2VJI7k'
      },
      success: (res) => {
        var data = res.data;
        this.setData({
          list: res.data.data
        })
      },
      fail: function () {
        console.log("接口调用失败");
      }
    })
  },
  nextPage: function () {
    console.log("下拉触发该函数");
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})
