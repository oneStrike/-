<template>
  <div class="play-song">
    <audio @loadstart="loadstart" @timeupdate="setTimer" ref="audio" :src="playURL" autoplay></audio>
    <div class="progress-bar">
      <div class="current-time">
        <span>{{curtTime|reTime}}</span>
      </div>
      <div ref="allProgress" @click.stop="skipPlay" class="all-progress">
        <div ref="curProgress" class="current-progress"></div>
      </div>
      <div class="all-time">
        <span>{{playData.time|reTime}}</span>
      </div>
    </div>
    <PlayControl :playTag="$refs.audio"></PlayControl>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {utils} from "@/utils/utils";
  import PlayControl from "../playControl/PlayControl";

  export default {
    name: "playSong",
    data() {
      return {
        curtTime: 0,
        playRatio: 0,
        playTimer: null,
        timer: null
      };
    },
    props: {
      playURL: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        isPlay: state => state.playPage.isPlay,
        rotateAndTimer: state => state.playPage.rotateAndTimer,
        latelyList: state => state.playPage.latelyList,
        lyricLine: state => state.playPage.lyricLine
      })
    },
    methods: {
      loadstart() {
        this.curtTime = 0;
        this.$refs.curProgress.style.width = "0";
      },
      skipPlay(e) {
        //=>如果在暂停时跳转进度，则自动播放并旋转封面
        if (!this.isPlay) {
          this.$store.commit("setPlayStatus", {
            play: true,
            effect: true
          });
          this.$refs.audio.play();
        }
        this.$refs.curProgress.style.width = e.offsetX + "px";
        let ratio =
          this.$refs.audio.duration / this.$refs.allProgress.offsetWidth;
        this.$refs.audio.currentTime = this.$refs.curProgress.offsetWidth * ratio;
      },
      setTimer() {
        this.curtTime = this.$refs.audio.currentTime;
        this.playRatio = (this.curtTime / this.$refs.audio.duration) * 100;
        this.$refs.curProgress.style.width = this.playRatio + "%";
      }
    },
    filters: {
      reTime(t) {
        return utils.reTime(t);
      },
    },
    watch: {
      isPlay: {
        handler: function (status) {
          status ? this.$refs.audio.play() : this.$refs.audio.pause();
        }
      }
    },
    activated() {
      this.$bus.$emit("audio", this.$refs.audio);
    },
    components: {
      PlayControl
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .progress-bar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 110px;

    .all-progress {
      width: 220px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      margin: 0 10px;
      border-radius: 2px;

      .current-progress {
        height: 100%;
        background: @themecolor;
        border-radius: 2px;
        /*transition: all 100ms linear;*/
      }
    }
  }
</style>