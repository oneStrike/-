<template>
  <div id="play-page">
    <div class="filter" :style="{backgroundImage:`url(${playData.cover})`}">
      <div class="bg"></div>
    </div>
    <header class="title">
      <div @click="$store.commit('setPlayStatus',{showPlayPage:false})" class="hide-btn">
        <i class="iconfont icon-jiantou-copy-copy"></i>
      </div>
      <h2>{{playData.name}}</h2>
      <h3>{{playData.singer}}</h3>
    </header>
    <section v-show="!showLyric" class="cover">
      <CoverRotate :coverURL="playData.cover"></CoverRotate>
    </section>
    <section @click="toggleLyric" ref="lyricContainer" :class="{'lyric-big':showLyric,'lyric-small':!showLyric}">
      <Lyric :lyric="lyric" :activeLine="activeLine"></Lyric>
    </section>
    <footer class="control">
      <playSong :playURL="playURL"></playSong>
    </footer>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import {getLyric} from "../../api";
  import CoverRotate from "../../components/playPage/coverRotate/CoverRotate";
  import PlaySong from "../../components/playPage/playSong/PlaySong";
  import Lyric from "../../components/playPage/lyric/Lyric";

  export default {
    name: "PlayPage",
    data() {
      return {
        lyric: '',
        showLyric: false,
        activeLine: 2,
      };
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        playURL: state => state.playPage.playURL,
        latelySongID: state => state.playPage.latelySongID,
      })
    },
    methods: {
      toggleLyric() {
        if (this.activeLine === 2) {
          this.showLyric = true;
          this.activeLine = 6;
        } else {
          this.showLyric = false;
          this.activeLine = 2;
        }
      },
      async getLyric() {
        try {
          this.lyric = (await getLyric(this.playData.id)).lrc.lyric;
        } catch (e) {
          this.lyric = '暂时没有歌词';
        }
      },

    },
    mounted() {
      this.getLyric()
      this.$store.dispatch('getSongURL', this.playData.id);
      this.$store.commit('setPlayStatus', {
        latelySongID: this.playData.id,
        lately: this.playData,
      })
    },
    watch: {
      //=>playData存储的始终是最新播放的歌曲，
      playData: {
        handler: function (value) {
          if (typeof value !== 'undefined') {
            this.$store.dispatch("getSongURL", value.id);
            this.getLyric()
            if (this.latelySongID.length === 0 || this.latelySongID.indexOf(value.id) === -1) {
              this.$store.commit('setPlayStatus', {
                latelySongID: value.id,
                lately: value,
              })
            }
          }
        },
        deep: true,
      }
    },
    components: {
      CoverRotate,
      PlaySong,
      Lyric
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #play-page {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
    background: #928f8f;
    color: #f1f1f1;
    transition: all 1s 0s linear;

    .filter {
      width: 100%;
      height: 100%;
      filter: blur(80px);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: -1;
      position: absolute;

      .bg {
        width: 300%;
        height: 300%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    .title {
      padding-top: 10px;
      text-align: center;

      .hide-btn {
        display: inline-block;
        position: absolute;
        left: 10px;
        text-align: center;

        .iconfont {
          font-size: 30px;
        }
      }

      h2 {
        display: inline-block;
        font-size: 18px;
        width: 230px;
        height: 20px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      h3 {
        font-size: 14px;
      }
    }

    .cover {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
    }

    .lyric-big {
      margin-top: 20px;
      width: 100%;
      height: 450px;
      overflow: hidden;
    }

    .lyric-small {
      width: 100%;
      height: 80px;
      overflow: hidden;
      position: absolute;
      top: 65%;
    }

    .control {
      width: 100%;
      height: 140px;
      position: fixed;
      bottom: 0;
    }
  }
</style>