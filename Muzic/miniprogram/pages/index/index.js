import request from '../../utils/util'
const app = getApp()
Page({
  data:{
    bannerList:[],
    recommendList:[],
  },
  
  onLoad: async function () {
    let bannerListData = await request('/banner', {type: 0})
    this.setData({
      bannerList : bannerListData.banners,
    })
    let commendListData = await request('/personalized',{limmit:30})
    this.setData({
      recommendList: commendListData.result
    })
  },
})