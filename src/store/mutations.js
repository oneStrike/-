import {
  GET_BANNER,
  GET_SONG_LIST
} from "./mutations_types";

export default {
  [GET_BANNER](state, data) {
    state.banners = data.banners
  },
  [GET_SONG_LIST](state, data) {
    state.songList = data.result;
  }
};
