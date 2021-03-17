import request from '../../utils/util.js'
Page({
    data: {
        phone: "",
        password: ""
    },
    onLoad: function (options) {},
    handleInput(event) {
        let type = event.currentTarget.dataset.type
        this.setData({
            [type]: event.detail.value
        })
    },
    // Login
    async login() {
        let {
            phone,
            password
        } = this.data;
        if (!phone) {
            wx.showToast({
                title: '手机号不能为空',
                icon: "none"
            })
            return;
        }
        let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: '手机号格式不正确',
                icon: "none"
            })
            return;
        }
        if (!password) {
            wx.showToast({
                title: '密码不能为空',
                icon: "none"
            })
            return;
        }
        let result = await request('/login/cellphone', {
            phone,
            password
        })
        if (result.code === 200) {
            wx.showToast({
                title: '登陆成功',
                icon: "none"
            })
            //用户信息存储在本地
            wx.setStorageSync('userInfo',JSON.stringify(result.profile))
            wx.reLaunch({
              url: '/pages/personal/index',
            })
        } else if (result.code === 400) {
            wx.showToast({
                title: '手机号错误',
                icon: "none"
            })
        } else if (result.code === 502) {
            wx.showToast({
                title: '密码错误',
                icon: "none"
            })
        } else {
            wx.showToast({
                title: '登陆失败，请重新登录',
                icon: "none"
            })
        }
    },




    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
})