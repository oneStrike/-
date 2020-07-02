import {
  getSongURL,
} from '../../api/index'

const playPage = {
  state: () => ({
    playData: {}, //当前播放歌曲的信息
    playURL: '', //=>歌曲的播放地址
    showPlayPage: false, //=>播放页的展示条件
    dynamicLoading: '', //按需加载播放页面，在点击歌曲时将值修改为播放页面组件的名字，
    isPlay: true, //=>是否正在播放音乐
    rotateAndTimer: false, //=>封面和定时器的开启条件
    latelyList: [], //=>存储历史播放的记录
    latelySongID: [],//历史歌曲的id，
    playSongList: [],//=>将歌单列表独立出来
    playMode: true,//=>用于判断播放的时历史记录还是歌单
  }),
  getters: {},
  mutations: {
    setPlayStatus(state, statusObj) {
      typeof statusObj.data !== 'undefined' ? state.playData = statusObj.data : state.playData;
      typeof statusObj.showPlayPage !== 'undefined' ? state.showPlayPage = statusObj.showPlayPage : state.showPlayPage;
      typeof statusObj.dynamic !== 'undefined' ? state.dynamicLoading = statusObj.dynamic : state.dynamicLoading;
      typeof statusObj.play !== 'undefined' ? state.isPlay = statusObj.play : state.isPlay;
      typeof statusObj.effect !== 'undefined' ? state.rotateAndTimer = statusObj.effect : state.rotateAndTimer;
      typeof statusObj.lately !== 'undefined' ? state.latelyList.push(statusObj.lately) : state.latelyList;
      typeof statusObj.URL !== 'undefined' ? state.playURL = statusObj.URL : state.playURL;
      typeof statusObj.mode !== 'undefined' ? state.playMode = statusObj.mode : state.playMode;
      typeof statusObj.latelySongID !== 'undefined' ? state.latelySongID.push(statusObj.latelySongID) : state.latelySongID;
    },
    setSongListPlay(state, songList) {
      state.playSongList = songList.songList;
    }
  },
  actions: {
    async getSongURL({commit}, id) {
      try {
        let url = await getSongURL(id);
        if (!url.data[0].url) {
          alert('当前歌曲需要VIP');
          return;
        }
        commit("setPlayStatus", {
          URL: url.data[0].url
        })
      } catch (e) {
        alert(e)
      }
    },
  },
}

export default playPage