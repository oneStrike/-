<template>
  <div class="play-control" @click="playControl">
    <div class="play-mode" v-if="modeShow">
      <i v-show="mode===1" class="iconfont icon-shunxubofang"></i>
      <i v-show="mode===2" class="iconfont icon-danquxunhuan"></i>
      <i v-show="mode===3" class="iconfont icon-suiji"></i>
    </div>
    <div class="last-song">
      <i class="iconfont icon-shangyiqu"></i>
    </div>
    <div class="play-status">
      <i v-show="isPlay" class="iconfont icon-zanting1"></i>
      <i v-show="!isPlay" class="iconfont icon-bofang"></i>
    </div>
    <div class="next-song">
      <i class="iconfont icon-xiayiqu"></i>
    </div>
    <div :class="{'like':!like}" class="collect" v-if="collect" @click="collectSong">
      <i class="iconfont icon-aixin"></i>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {likeSong} from "../../../api";

  export default {
    name: "PlayControl",
    data() {
      return {
        mode: 1,
        random: null,
        repeatRandom: null,
        audio: '',
        songs: [],
        playTag: '',
        like: true,
      };
    },
    props: {
      // playTag: {
      //   type: HTMLAudioElement,
      // },
      modeShow: {
        type: Boolean,
        default: true,
      },
      collect: {
        type: Boolean,
        default: true,
      }
    },
    computed: {
      ...mapState({
        isPlay: state => state.playPage.isPlay,
        latelyList: state => state.playPage.latelyList,
        playSongList: state => state.playPage.playSongList,
        playData: state => state.playPage.playData,
        playMode: state => state.playPage.playMode
      })
    },
    methods: {
      setRandom(num) {
        this.random = Math.floor(Math.random() * this.songs.length);
        if (this.random === this.repeatRandom || this.random === num) {
          this.setRandom();
        }
        this.repeatRandom = this.random;
      },
      toggleSong(upOrDown) {
        this.playMode ? this.songs = this.latelyList : this.songs = this.playSongList;
        //=>只有一首歌并且不是单曲循环，播放完毕后就直接暂停
        if (this.songs.length === 1 && this.mode !== 2 && this.playTag.ended) {
          this.$store.commit("setPlayStatus", {
            play: false,
            effect: false
          });
          return;
        }
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i].id === this.playData.id) {
            if (this.mode === 3) {
              this.setRandom(i);
              i = this.random;
            }
            //=>判断当前播放的歌曲时播放列表的最后一位或者时第一位，实现列表循环
            upOrDown ?
              (i === this.songs.length - 1 ? (i = -1) : null) :
              (i === 0 ? (i = this.songs.length) : null);
            this.$store.commit("setPlayStatus", {
              play: true,
              effect: true,
              data: upOrDown ? this.songs[++i] : this.songs[--i]
            });
            return;
          }
        }
      },
      //=>利用事件冒泡的机制统一控制播放
      playControl(e) {
        let target = e.target;
        if (target.className === "play-status" ||
          target.parentElement.className === "play-status") {
          //暂停播放
          this.$store.commit("setPlayStatus", {
            play: !this.isPlay,
            effect: !this.isPlay
          });
        } else if (target.className === "last-song" ||
          target.parentElement.className === "last-song") {
          //=>上一曲,
          if (typeof this.playTag === 'undefined') return;
          this.toggleSong()
        } else if (target.className === "next-song" ||
          target.parentElement.className === "next-song") {
          //=>下一曲
          if (typeof this.playTag === 'undefined') return;
          this.toggleSong(true);
        } else if (
          target.className === "play-mode" ||
          target.parentElement.className === "play-mode"
        ) {
          //=>播放模式
          this.mode++;
          this.mode > 3 ? this.mode = 1 : null;
        }
      },
      async collectSong() {
        try {
          //=>点击收藏当前歌曲，无法判断当前播放的歌曲是否已经收藏
          await likeSong(this.playData.id, this.like)
          this.like = !this.like;
        } catch (e) {
          console.log(e);
        }
      },
    },
    activated() {
      this.$bus.$on('audio', a => {
        this.playTag = a;
        this.playTag.addEventListener("ended", () => {
          if (this.mode === 2) {
            //=>单曲循环
            //loop不自动重播？
            // this.playTag.loop = true;
            this.playTag.currentTime = 0.1;
            this.playTag.play();
          } else {
            this.toggleSong(true);
          }
        });
      })
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .play-control {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    line-height: 50px;

    .play-status {
      .iconfont {
        font-size: 40px;
      }
    }

    .iconfont {
      width: 100%;
      height: 100%;
      display: inline-block;
      font-size: 24px;
    }

    .like {
      .iconfont {
        color: @themecolor;
      }
    }
  }
</style>