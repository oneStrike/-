import instance from './ajax';

//轮播图
export const getBannerData = () => instance.get('banner')

//轮播图对应的歌曲信息
export const getBannerSongDetail = (id) => instance.get(`/song/detail?ids=${id}`)

//推荐歌单
export const getSongList = () => instance.get('personalized')

//歌单详情 登录前只能获取10首歌，登录后也只能获取20首，
export const getSongListDetail = (id) => instance.get(`playlist/detail?id=${id}`)

//推荐歌曲
export const getSong = () => instance.get('/personalized/newsong');

//获取歌词
export const getLyric = (id) => instance.get(`/lyric?id=${id}`)

//收藏歌曲

export const likeSong = (id, like) => instance.get(`/like?id=${id}&like=${like}`)

//推荐的mv
export const getTopMV = (area) => instance.get(`/top/mv?area=${area}`)

//mv的信息
export const getMVDetail = (mvId) => instance.get(`/mv/detail?mvid=${mvId}`)

//mv的播放地址
export const getMvUrl = (mvId) => instance.get(`/mv/url?id=${mvId}`)

//相似的mv
export const getSimiMv = (mvId) => instance.get(`/simi/mv?mvid=${mvId}`)

//音乐播放地址
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

//歌曲详情，供搜索的歌曲提供封面
export const getSongDetail = (id) => instance.get(`/song/detail?ids=${id}`)

//获取歌手分类
export const getSingers = (type, area, offset = 0) => instance.get(`/artist/list?type=${type}&area=${area}&limit=30&offset=${offset * 30}&initial=-1`)

//手机登录 完成登录后 , 会在浏览器保存一个 Cookies 用作登录凭证
export const phoneLogin = (phone, pw) => instance.post(`/login/cellphone?phone=${phone}&password=${pw}`)

//邮箱登录 完成登录后 , 会在浏览器保存一个 Cookies 用作登录凭证
export const emailLogin = (email, pw) => instance.post(`/login?email=${email}&password=${pw}`)

//退出登录

export const logout = () => instance.get('/logout');

//登录状态，浏览器刷新后会清空vuex的数据，调用这个接口重新获取
export const loginStatus = () => instance.get('/login/status');

//发送验证码
export const sendAuthCode = (phone) => instance.get(`/captcha/sent?phone=${phone}`)

//验证验证码
export const verifyAuthCode = (phone, authCode) => instance.get(`/captcha/verify?phone=${phone}&captcha=${authCode}`)

//获取用户歌单
export const getUserSongList = (userID) => instance.get(`/user/playlist?uid=${userID}`)

//每日推荐
export const getRecommend = () => instance.get('/recommend/songs')

//历史播放
export const getRecord = (userID, type) => instance.get(`/user/record?uid=${userID}&type=${type}`)

//喜欢的音乐
export const getLikeList = (userID) => instance.get(`/likelist?uid=${userID}`)

// //推荐电台
//
// export const getRadio = () => instance.get('/personalized/djprogram')
//
// //所有榜单内容摘要
//
// export const getTopListDetail = () => instance.get('/toplist/detail')