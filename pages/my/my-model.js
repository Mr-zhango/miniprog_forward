import { Base } from '../../utils/base.js'
class My extends Base{
    constructor(){
        super();
    }
    SaveOrUpdate(userinfo){
        var params = {
            url:'/user/login',
            method:'POST',
            data:userinfo,
            sCallback:function(res){
                // Callback && Callback(res);
                console.log(res);
            }
        };
        this.request(params);
    }
    //加载用户信息
    loadUserinfo(obj){
        var userinfo = wx.getStorageSync('userInfo');
        if(userinfo){
            obj.setData({
                userInfo:userinfo
            });
        }
    }
    //获取用户借阅的图书
    loadUserBook(){
        var params = {
            url:'/user/1',
        };
    }
}

export { My }
