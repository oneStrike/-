<template>
  <div id="play-page">
    <div class="filter" :style="{backgroundImage:`url(${playData.cover})`}">
      <div class="bg"></div>
    </div>
    <header class="title">
      <div @click="hide" class="hide-btn">
        <i class="iconfont icon-jiantou-copy-copy"></i>
      </div>
      <h2>{{playData.name}}</h2>
      <h3>{{playData.singer}}</h3>
    </header>
    <section @click="adjustLyric" v-show="!showLyric" class="cover">
      <CoverRotate :coverURL="playData.cover"></CoverRotate>
    </section>
    <section ref="lyricContainer" :class="{'lyric-big':showLyric,'lyric-small':!showLyric}">
      <Lyric
              :activeLine="activeLine"
              :lyric="showLyric"
              @hide-lyric="hideLyric"
              :lyricContent="lyricContent"
      ></Lyric>
    </section>
    <footer class="control">
      <playSong :playURL="playURL"></playSong>
    </footer>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import CoverRotate from "@playpage/coverRotate/CoverRotate";
  import PlaySong from "@playpage/playSong/PlaySong";
  import Lyric from "@playpage/lyric/Lyric";

  export default {
    name: "PlayPage",
    data() {
      return {
        showLyric: false,
        lyricContent: "",
        activeLine: 2
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
      hide() {
        this.$store.commit("setPlayStatus", {showPlayPage: false});
      },
      adjustLyric() {
        this.showLyric = true;
        this.activeLine = 6;
      },
      hideLyric() {
        this.showLyric = false;
        this.activeLine = 2;
      }
    },
    watch: {
      //=>playData存储的始终是最新播放的歌曲，
      playData: {
        handler: function (value) {
          this.$store.dispatch("getSongURL", value.id);
          this.$store.dispatch("getLyric", value.id);
          if (this.latelySongID.length === 0 || this.latelySongID.indexOf(value.id) === -1) {
            this.$store.commit('setPlayStatus', {
              latelySongID: value.id,
              lately: value,
            })
          }
        },
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