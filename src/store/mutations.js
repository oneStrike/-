import {
  GET_BANNER,
  GET_SONG_LIST,
  GET_SONG,
  GET_DJPROGRAM,
  GET_TOP_LIST_DETAIL
} from "./mutations_types";

export default {
  [GET_BANNER](state, data) {
    state.banners = data.banners
  },
  [GET_SONG_LIST](state, data) {
    state.songList = data.result;
  },
  [GET_SONG](state, data) {
    state.song = data.result;
  },
  [GET_DJPROGRAM](state, data) {
    state.djprogram = data.result;
  },
  [GET_TOP_LIST_DETAIL](state, data) {
    state.topListDetail = data.list.splice(0,4);
    data = null;
  }
};
