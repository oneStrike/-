import instance from './ajax';

//轮播图
export const getBannerData = () => instance.get('banner')

//轮播图对应的歌曲信息

export const getBannerSongDetail = (id) => instance.get(`/song/detail?ids=${id}`)

//推荐歌单

export const getSongList = () => instance.get('personalized')

//歌单详情

export const getSongListDetail = (id) => instance.get(`playlist/detail?id=${id}`)

//推荐歌曲

export const getSong = () => instance.get('/personalized/newsong');

//获取歌词
export const getLyric = (id) => instance.get(`/lyric?id=${id}`)

//推荐的mv
export const getTopMV = (area) => instance.get(`/top/mv?area=${area}`)

//mv的信息
export const getMVDetail = (mvId) => instance.get(`/mv/detail?mvid=${mvId}`)

//mv的播放地址
export const getMvUrl = (mvId) => instance.get(`/mv/url?id=${mvId}`)

//相似的mv
export const getSimiMv = (mvId) => instance.get(`/simi/mv?mvid=${mvId}`)

//音乐播放地址,需要传入歌曲id
export const getSongURL = (id) => instance.get(`/song/url?id=${id}`)

//歌手热门50首
export const getSingerHitSongs = (id) => instance.get(`/artist/top/song?id=${id}`)

//搜索

export const getSearch = (key, type) => instance.get(`/search?keywords=${key}&type=${type}`)

//默认搜索关键词

export const getDefaultSearchKeyWords = () => instance.get('/search/default')

//热搜列表

export const getTopSearchList = () => instance.get('/search/hot/detail')

//搜索建议

export const getSearchSuggest = (key) => instance.get(`/search/suggest?keywords=${key}&type=mobile`)

// //推荐电台
//
// export const getRadio = () => instance.get('/personalized/djprogram')
//
// //所有榜单内容摘要
//
// export const getTopListDetail = () => instance.get('/toplist/detail')