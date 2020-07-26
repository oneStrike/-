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
  },
  reData(data, type) {
    let listData = [];
    switch (type) {
      case "song":
        if (data.constructor === Object) {
          let songData = song(data.song);
          songData.cover ? null : songData.cover = data.picUrl;
          return songData
        } else {
          data.forEach((item) => {
            listData.push(song(item))
          })
        }
        return listData
      case "singer":
        if (data.constructor === Object) {
          return singer(data)
        } else {
          data.forEach((item) => {
            listData.push(singer(item))
          })
        }
        return listData
      case "mv":
        if (data.constructor === Object) {
          return mv(data)
        } else {
          data.forEach((item) => {
            listData.push(mv(item))
          })
        }
        return listData;
      case "songList":
        if (data.constructor === Object) {
          return songList(data)
        } else {
          data.forEach((item) => {
            listData.push(songList(item))
          })
        }
        return listData
    }
    return data
  }
}

function song(item) {
  return {
    name: item.name,
    id: item.id,
    singer: item.artists ? item.artists[0].name : item.ar[0].name,
    singerID: item.artists ? item.artists[0].id : item.ar[0].id,
    time: item.duration ? item.duration : item.dt,
    cover: item.al ? item.al.picUrl : '',
    type: 'song'
  }
}

function singer(item) {
  return {
    name: item.name,
    id: item.id,
    cover: item.picUrl,
    type: 'singer',

  }
}

function mv(item) {
  return {
    name: item.name,
    id: item.id,
    cover: item.cover,
    singer: item.artistName,
    singerID: item.artistID,
    des: item.briefDesc,
    type: 'mv'
  }
}

function songList(item) {
  return {
    name: item.name,
    id: item.id,
    singer: item.description,
    cover: item.coverImgUrl,
    count: item.trackCount ? item.trackCount : null,
    type: 'songList'
  }
}