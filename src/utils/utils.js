export const utils = {
  //=>格式化歌单的播放次数
  reNum: function (num) {
    num += '';
    if (num.length < 5) return;
    if (num.length < 9) {
      return Number(num.slice(0, -4)) + '万'
    } else if (num.length >= 9) {
      let newNum = num.slice(0, -7);
      newNum = newNum.slice(0, -1) + '.' + newNum.slice(-1);
      return Number(newNum) + '亿'
    }
  },
  //=>格式化歌曲时间的总长度
  reTime: function (time) {
    time > 10000 ? time = time / 1000 : time;
    //=>设置一个界限用来判定传入的时毫秒还是秒
    const minute = `${Math.floor(time / 60)}`.padStart(2, '0');
    const second = `${Math.floor(time % 60)}`.padStart(2, '0');
    return `${minute}:${second}`;
  }
}