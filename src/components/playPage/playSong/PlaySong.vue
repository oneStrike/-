<template>
  <div class="play-song">
    <audio @loadstart="loadstart" ref="audio" :src="playURL" autoplay></audio>
    <div class="progress-bar">
      <div class="current-time">
        <span>{{curtTime|reCurrentTime}}</span>
      </div>
      <div ref="allProgress" @click.stop="skipPlay" class="all-progress">
        <div ref="curProgress" class="current-progress"></div>
        <span ref="mark" class="mark"></span>
      </div>
      <div class="all-time">
        <span>{{playData.time|reDuration}}</span>
      </div>
    </div>
    <PlayControl :playTag="$refs.audio"></PlayControl>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {utils} from '@/utils/utils'
  import PlayControl from '@playpage/playControl/PlayControl'

  export default {
    name: 'playSong',
    data() {
      return {
        curtTime: 0,
        playRatio: 0,
        playTimer: null,
        timer: null,
      }
    },
    props: {
      playURL: {
        type: String,
        required: true,
      }
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        isPlay: state => state.playPage.isPlay,
        rotateAndTimer: state => state.playPage.rotateAndTimer,
      })
    },
    methods: {
      loadstart() {
        this.curtTime = 0;
        this.$refs.curProgress.style.width = '0';
        this.$refs.mark.style.transform = `translate(0,0)`
      },
      skipPlay(e) {
        //=>如果在暂停时跳转进度，则自动播放并旋转封面
        if (!this.isPlay) {
          this.$store.commit('setRotateAndTimer', true)
          this.$refs.audio.play()
        }
        this.$refs.curProgress.style.width = e.offsetX + 'px';
        this.$refs.mark.style.transform = `translate(${e.offsetX - 6}px,0)`;
        let ratio = this.$refs.audio.duration / this.$refs.allProgress.offsetWidth;
        this.$refs.audio.currentTime = this.$refs.curProgress.offsetWidth * ratio;
        //=>立即改变已经播放的时间，不用等到下一次定时器调用，
        this.curtTime = this.$refs.audio.currentTime;
      },
      setTimer() {
        this.timer = setInterval(() => {
          this.curtTime = this.$refs.audio.currentTime;
          this.playRatio = (this.curtTime / this.$refs.audio.duration) * 100;
          this.$refs.curProgress.style.width = this.playRatio + '%';
          this.$refs.mark.style.transform = `translate(${this.$refs.curProgress.offsetWidth - 6}px,0)`;
          if (this.$refs.audio.ended) {
            this.$store.commit('setRotateAndTimer', false)
          }
          console.log(2)
        }, 1000)
      }
    },
    filters: {
      reDuration(time) {
        return utils.reTime(time)
      },
      reCurrentTime(time) {
        return utils.reTime(time)
      }
    },
    watch: {
      rotateAndTimer(newVal) {
        this.$nextTick(() => {
          if (newVal) {
            this.setTimer()
          } else {
            //=>没有播放歌曲或者播放歌曲时隐藏播放页面则清除定时器
            if (this.timer) {
              clearInterval(this.timer)
            }
          }
        })
      }
    },
    activated() {
      //=>解决第一次展示播放页面是无法开启定时器的问题
      this.setTimer();
    },
    components: {
      PlayControl
    }
  }
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
      background: rgba(0, 0, 0, .3);
      margin: 0 10px;

      .current-progress {
        height: 100%;
        background: @themecolor;
      }

      .mark {
        display: block;
        width: 6px;
        height: 6px;
        border: 3px solid #fff;
        border-radius: 10px;
        background: @themecolor;
        position: absolute;
        top: 3px;
        transform: translate(-6px, 0)
      }
    }
  }
</style>