import {Config} from './config.js';

class Base {
    constructor() {
        this.baseRequestUrl = Config.restUrl;
        //this.getCode();
    }

    //封装好请求地址的函数
    request(params) {
        var url = this.baseRequestUrl + params.url;
        var method = 'GET';
        var data = params.data;
        if (params.method) {
            method = params.method;
        }


        wx.request({
            url: url,
            data: data,
            method: method,
            dataType: JSON,
            success: function (res) {
                params.sCallback && params.sCallback(res.data);
            }
        })
    }

    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    }

    // //获取code
    // getCode() {
    //     var that = this;
    //     wx.login({
    //         success: function (res) {
    //             if (res.code) {
    //                 console.log("getCode 方法执行了")
    //                 console.log("getCode 方法拿到的code,用来和后台服务器交互获取openkey和session_key的时候的:code是:" + res.code);
    //
    //                 that.getOpenID(res.code);
    //             }
    //         }
    //     });
    // }

// //通过code获取openid
//     getOpenID(code) {
//         var that = this;
//         var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + Config.appid + '&secret=' + Config.secret + '&js_code=' + code + '&grant_type=authorization_code';
//         wx.request({
//             url: url,
//             success: function (res) {
//                 //成功得到openid和session_key,保存到本地
//                 console.log("获取openid函数回调结果:" + res.data.openid);
//                 wx.setStorageSync('openid', res.data.openid);
//                 wx.setStorageSync('session_key', res.data.session_key);
//             }
//         })
//     }
    /*//获取用户信息
    getUserInfos() {
        var that = this;
        wx.getUserInfo({
            withCredentials: true,//非必填  默认为true
            success: function (res) {
                console.log("点击了按钮getUserInfos:res信息是:" + res);
                var data = Array();
                var userInfo = res.userInfo;
                userInfo.openid = wx.getStorageSync('openid');
                userInfo.session_key = wx.getStorageSync('session_key');
                console.log("userInfo,也就是需要保存到数据库的信息:" + userInfo);
                that.SaveOrUpdate(userInfo);
                //将用户信息保存到本地e
                wx.setStorageSync('userInfo', userInfo);
            }
        }),
        //重定向到首页去
        wx.reLaunch({      //token失效，界面重定向到登录页,绝对路劲
            url: "/pages/index/index",
        })
    }*/
}
export {Base}
