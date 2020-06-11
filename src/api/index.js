import instance from './ajax';

//轮播图
export const getBannerData = (systemVersion) => instance.get(`banner?type=${systemVersion}`)

//推荐歌单

export const getSongList = () => instance.get('personalized')