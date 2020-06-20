import {getSongURL} from '../../api/index'

const playPage = {
  state: () => ({
    playData: {},//播放页所需的数据
    playURL: '',//=>歌曲的播放地址
    isShow: false,//=>播放页的展示条件
    dynamicLoading: '',//按需加载播放页面，在点击歌曲时将值修改为播放页面组件的名字，
    isPlay: true,//=>是否正在播放音乐
    rotateAndTimer: true,//=>audio标签
    latelyList: [],//=>存储历史播放的记录
  }),
  getter: {},
  mutations: {
    getPlayData(state, songData) {
      state.playData = songData
    },
    getPlayURL(state, songURL) {
      state.playURL = songURL;
    },
    playShow(state, whether) {
      state.isShow = whether;
    },
    dynamic(state, comName) {
      state.dynamicLoading = comName
    },
    setIsPlay(state, whether) {
      state.isPlay = whether;
    },
    setRotateAndTimer(state, whether) {
      state.rotateAndTimer = whether
    },
    setLatelyList(state, latelyObj) {
      state.latelyList.push(latelyObj)
      console.log(23)
    }
  },
  actions: {
    async getSongURL({commit}, id) {
      let url = await getSongURL(id);
      commit("getPlayURL", url.data[0].url)
    },
  },
}

export default playPage