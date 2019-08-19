// pages/search/search.js
import {Config} from "../../utils/config";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    multiArray: [
                 ['纪念品', '文化','古籍','法律'],
                 ['钥匙扣', '中国政治','世界政治', '时政', '党政读物']
                 ],
    multiIndex: [0, 0],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //当值发生改变时触发
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['政治理论', '中国政治', '世界政治', '时政', '党政读物'];
            break;
          case 1:
            data.multiArray[1] = ['文化理论', '中国民俗', '华夏文化','世界文化','草原文化'];
            break;
          case 2:
            data.multiArray[1] = ['春秋', '纪传', '史评', '儒家', '楚辞'];
            break;
          case 3:
            data.multiArray[1] = ['法律工具', '司法案例', '法律法规', '法学理论', '司法制度'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
 }
    this.setData(data);
  },


    buyTicket: function(e) {
        //console.info("购买")
        wx.request({
            url: Config.test, //url
            method: 'POST', //请求方式
            header: {
                'Content-Type': 'application/json',
            },
            // data: {
            //     activityId: options.id,  //参数
            // },
            // success: function(res) {
            //     if (res.data.code == 1) {
            //         _this.setData({
            //             phone: res.data.user.phone,
            //             password: res.data.user.password
            //         })
            //     }
            // },
            fail: function() {
                app.consoleLog("请求数据失败");
            },
            complete: function() {
                console.info("请求完成")
            }
        })
    }
})