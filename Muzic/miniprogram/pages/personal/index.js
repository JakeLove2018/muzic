import request from '../../utils/util.js'
let startY = 0;
let moveY = 0;
let moveDistance = 0;
Page({
    data: {
        coverTransform:'translateY(0rpx)',
        coveTransition:'',
        userInfo:{}, //用户信息
        recentPlayList:[] //用户播放记录 
    },
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo)
        if(userInfo){
            //更新userInfo状态
            this.setData({
                userInfo:JSON.parse(userInfo)
            })

            //获取用户播放记录
            this.getUserRecentPlayList(this.data.userInfo.userId)
        }
    },
    //获取用户的播放记录功能
    async getUserRecentPlayList(userId){
        let recentPlayListData = await request('/user/record',{uid:userId,type:0})
        let index = 0
        let recentPlayList = recentPlayListData.allData.slice(0,20).map(item=>{
            item.id = index ++;
            return item;
        })
        this.setData({
            recentPlayList
        })
    },
    handleTouchStart(event){
        this.setData({
            coveTransition:''
        })
        startY = event.touches[0].clientY; // 获取手指的起始坐标
    },
    handleTouchMove(event){
        moveY = event.touches[0].clientY
        moveDistance = moveY - startY
        if(moveDistance<0){
            return 
        }else if(moveDistance >= 80){
            moveDistance = 100
        }
        this.setData({
            coverTransform:`translateY(${moveDistance}rpx)`
            
        })
    },
    handleTouchEnd(){
        this.setData({
            coverTransform:`translateY(0rpx))`,
            coveTransition:`transform 0.8s linear`
        })
    },
    toLogin(){
        wx.navigateTo({
          url: '/pages/login/index',
        })
    },
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