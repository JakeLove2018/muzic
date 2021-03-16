import request from '../../utils/util'
const app = getApp()
Page({
  data:{
    bannerList:[],
    recommendList:[],
    topList:[],
    topListSong:[]
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
// 排行榜，获取排行榜详情获取
      let reslutArr = [];//所欲榜单内容
      let topListData = await request('/toplist');
      let allLists = topListData.list; //所有榜单
      for(let i = 0,len  = allLists.length;i < len; i++){
        let name = allLists[i].name;
        let id = allLists[i].id
        let topListItem  = {name:name,id:id}
        reslutArr.push(topListItem);  
        this.setData({
          topList:reslutArr
        })
      }
      let id = reslutArr[0].id
      let index = 0
      for(let q = 0;q < 30;q++){
        let playlistData = await request('/playlist/detail',{id:id})
        // console.log(playlistData)
        this.setData({
          topListSong:playlistData.playlist.tracks.slice(0,5),
        })
      }
      
// 排行榜
  },
})