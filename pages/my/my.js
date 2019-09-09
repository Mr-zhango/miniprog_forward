import { My } from './my-model.js';
var my = new My();

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
      this.getUserInfos();
      //刷新页面
    }else{

    }
  },
  getUserInfos(callback = () =>{}){
    //let that = this;
    wx.login({
      success:function(loginRes){
        if(loginRes){
          //获取用户信息
          wx.getUserInfo({
            withCredentials:true,//非必填  默认为true
            success:function(infoRes){
              console.log(infoRes,'+++++++++++++++++++++++++++++++');
              //请求服务端的登录接口
              wx.request({
                //url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + Config.appid + '&secret=' + Config.secret + '&js_code=' + loginRes.code + '&grant_type=authorization_code',
                url:'http://localhost:8080/user/login',
                data:{
                  code:loginRes.code,//临时登录凭证
                  rawData:infoRes.rawData,//用户非敏感信息
                  signature:infoRes.signature,//签名
                  encrypteData:infoRes.encryptedData,//用户敏感信息
                  iv:infoRes.iv//解密算法的向量
                },
                success:function(res){
                  console.log('login success');


                  res = res.data;

                  console.log(res.userInfo);
                  if(res.result==0){
                    var user = res.userInfo
                    console.log(user);
                    console.log('后台返回 result' +res.result );
                    // that.globalData.userInfo = user;
                    wx.setStorageSync('userInfo',JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag',res.skey);

                    console.log("skey="+res.skey);
                    console.log('callback()');
                    // callback();
                  }else{
                    console.log('后台登录成功');
                    // that.showInfo('res.errmsg');
                  }
                },
                fail:function(error){
                  //调用服务端登录接口失败
                  // that.showInfo('调用接口失败');
                  console.log(error);
                }
              });
            }
          });
        }else{

        }
      }
    });
  }
})
