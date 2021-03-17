import request from '../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[], //标签导航数据
        navId:"", //导航标识
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVideoGroupListData()
    },
    // 获取导函数
    async getVideoGroupListData(){
        let videoGroupListData = await request('/video/group/list');
        this.setData({
            videoGroupList:videoGroupListData.data.slice(0,25),
            navID:videoGroupListData.data[0].id
        })
    },
    //点击切换导航
    
    changeNav(event){
        // let navId = event.currentTarget.id; // 会自动转换成String
        let navId = event.currentTarget.dataset.id
        this.setData({
            navId:navId >>> 0 
        })
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

    }
})