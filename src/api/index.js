import instance from './ajax';

//轮播图
export const getBannerData = (systemVersion) => instance.get(`banner?type=${systemVersion}`)

//推荐歌单

export const getSongList = () => instance.get('personalized')

//推荐歌曲

export const getSong = () => instance.get('/personalized/newsong');

//推荐电台

export const getDjprogram = () => instance.get('/personalized/djprogram')

//所有榜单内容摘要

export const getTopListDetail = () => instance.get('/toplist/detail')