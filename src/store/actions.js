import {GET_BANNER, GET_DJPROGRAM, GET_SONG, GET_SONG_LIST, GET_TOP_LIST_DETAIL} from "./mutations_types";
import {
  getBannerData,
  getSongList,
  getSong,
  getDjprogram,
  getTopListDetail

} from "../api";

export default {
  async getbanner({commit}) {
    let data = await getBannerData(2)
    commit(GET_BANNER, data);
  },
  async getSongListContent({commit}) {
    let data = await getSongList();
    commit(GET_SONG_LIST, data)
  },
  async getSong({commit}) {
    let data = await getSong();
    commit(GET_SONG, data)
  },
  async getDjprogram({commit}) {
    let data = await getDjprogram();
    commit(GET_DJPROGRAM, data)
  },

  async getTopListDetail({commit}) {
    let data = await getTopListDetail();
    commit(GET_TOP_LIST_DETAIL,data)
  }
};
