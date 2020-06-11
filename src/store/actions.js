import {GET_BANNER, GET_SONG_LIST} from "./mutations_types";
import {
  getBannerData,
  getSongList
} from "../api";

export default {
  async getbanner({commit}) {
    let data = await getBannerData(2)
    commit(GET_BANNER, data);
  },
  async getSongListContent({commit}) {
    let data = await getSongList();
    commit(GET_SONG_LIST, data)
  }
};
