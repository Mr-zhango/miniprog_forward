import { My } from './my-model.js';
var my = new My();

//获取应用实例
const app = getApp()

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      this.doLogin();
      // 在没有 open-type=getUserInfo 版本的兼容处理
    }
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
    //加载用户信息
    my.loadUserinfo(this);
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
  //点击登录函数
  onLogintap:function(data){
    console.log("用户点击了"+data);
    //判断用户是否点击了允许
    if(data.detail.rawData){
      //用户点击了允许
      //保存用户信息
      my.getUserInfos();
      //刷新页面
    }else{

    }
  },
  doLogin: function (callback = () => {
  }) {
    let that = this;
    wx.login({
      success: function (loginRes) {
        if (loginRes) {
          //获取用户信息
          wx.getUserInfo({
            withCredentials: true,//非必填  默认为true
            success: function (infoRes) {
              console.log(infoRes, '>>>');
              //请求服务端的登录接口
              wx.request({
                url: 'http://localhost:8080/user/login',
                data: {
                  code: loginRes.code,//临时登录凭证
                  rawData: infoRes.rawData,//用户非敏感信息
                  signature: infoRes.signature,//签名
                  encrypteData: infoRes.encryptedData,//用户敏感信息
                  iv: infoRes.iv//解密算法的向量
                },
                success: function (res) {
                  console.log('login success');
                  console.log('res信息:' + res);

                  res = res.data;
                  if (res.result == 0) {
                    //that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag', res.skey);
                    console.log("skey=" + res.skey);

                    that.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                    })

                  } else {
                    console.log("登录失败");
                  }
                },
              });
            }
          });
        } else {

        }
      }
    });
  }

})