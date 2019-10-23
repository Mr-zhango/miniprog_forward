// pages/search/search.js
import {Config} from "../../utils/config";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mHidden: true,
        list: [],
        categoeyList: [],
        array: ['美国', '中国', '巴西', '日本'],
        objectArray: [
            {
                id: 0,
                name: '美国'
            },
            {
                id: 1,
                name: '中国'
            },
            {
                id: 2,
                name: '巴西'
            },
            {
                id: 3,
                name: '日本'
            }
        ],
        index: 0,
        multiArray: [['北京', '上海','广州'], ['北京市通州区新华西街58号万达广场1号楼5层', '北京市石景山区石景山路乙18号万达广场娱乐楼三层','北京市丰台区丰科路与五圈路交叉口丰台万达广场6层']],
        multiIndex: [0, 0],
        date: '2016-09-01',
        time: '12:01'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onRequest()
        this.allCategory()
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


    buyTicket: function (e) {
        console.info("购买")
        wx.request({
            url: 'https://www.myfreecloud.cn:9090/product/buy',
            method: 'POST', //请求方式
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                productId: 111,  //参数
                productName: "product",  //参数
                productNum: 1,
                productPrice: 0.01,  //参数
            },
            success: function (res) {
                // if (res.data.code == 1) {
                //     _this.setData({
                //         phone: res.data.user.phone,
                //         password: res.data.user.password
                //     })
                // }
            },
            fail: function () {
                app.consoleLog("请求数据失败");
            },
            complete: function () {
                console.info("请求完成")
            }
        })
    },
    openCode: function (e) {
        console.info("打开二维码窗口")
        this.setData({
            mHidden: false
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
            //url: 'https://www.myfreecloud.cn:9090/product/all',
            url: 'https://www.myfreecloud.cn:9090/product/all',
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
    allCategory() {
        wx.request({
            //url: 'https://www.myfreecloud.cn:9090/product/all',
            url: 'https://www.myfreecloud.cn:9090/api/category/allCategoey',
            method: "POST",
            header: {
                'Content-Type': 'json',
                'token': 'o2aHu0H12zKzroLqx26-Fa2VJI7k'
            },
            success: (res) => {
                var data = res.data;
                this.setData({
                    categoeyList: res.data
                })
            },
            fail: function () {
                console.log("接口调用失败");
            }
        })
    },
    queryCategory(e) {
        wx.request({
            //url: 'https://www.myfreecloud.cn:9090/product/all',
            url: 'https://www.myfreecloud.cn:9090/queryByCatId/' + e.currentTarget.dataset['index'],
            method: "GET",
            header: {
                'Content-Type': 'json',
                'token': 'o2aHu0H12zKzroLqx26-Fa2VJI7k'
            },
            success: (res) => {
                var data = res.data.data;
                this.setData({
                    list: data
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
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
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
                        data.multiArray[1] = ['北京市通州区新华西街58号万达广场1号楼5层', '北京市石景山区石景山路乙18号万达广场娱乐楼三层', '北京市丰台区丰科路与五圈路交叉口丰台万达广场6层'];
                        break;
                    case 1:
                        data.multiArray[1] = ['上海市嘉定区江桥镇金沙江西路1075弄49号江桥万达广场3层', '上海市浦东新区周浦镇年家浜路518号万达广场C座4层', '上海市杨浦区国宾路58号万达广场三层'];
                        break;
                    case 2:
                        data.multiArray[1] = ['广东省广州市黄埔区科丰路89号万达广场娱乐楼4层', '广东省广州市番禺区汉溪大道东389号番禺万达广场4层', '广东省广州市白云区云城东路503号万达广场娱乐楼3层'];
                        break;
                }
                data.multiIndex[1] = 0;
                break;
        }
        console.log(data.multiIndex);
        this.setData(data);
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    }

})
