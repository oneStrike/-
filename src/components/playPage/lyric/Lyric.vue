<template>
  <Scroll eventPassthroug="''" :data="lyric" :scrollY="true">
    <ul id="lyric-container" ref="lyricContent">
      <li class="lyric-child" ref="lyricDetail" :class="{'active':line-1===index}" v-for="(lyric,index) in reLyric"
          :key="index">
        <p :class="{hide:hide}">{{lyric}}</p>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from "../../common/scroll/Scroll";

  export default {
    name: "Lyric",
    data() {
      return {
        lyricTime: [],
        line: 0,
        curTime: 0,
        hide: false,
      };
    },
    props: {
      lyric: {
        type: String,
      },
      activeLine: {
        type: [Number, String],
        default: 2
      }
    },
    computed: {
      //=>解析歌词
      reLyric() {
        if (this.lyric) {
          //=>TODO 有些歌的接口返回的歌词不完整
          this.lyric.replace(/(\[.*?]\s*)(?=\[)/g, "").replace(/\[.*?]/g, time => {
            time = time.split(/\D/);
            time = time.splice(1, 3);
            time = parseInt(time[0]) * 60 + parseInt(time[1]) + "." + time[2];
            this.lyricTime.push(time);
          });
        }
        let lyricArr = this.lyric.split(/\s*\n*\[.*?]\s*/).filter(v => !!v);
        if (this.lyricTime.length < 1) {
          lyricArr.unshift('**该歌词不支持滚动**')
        }
        return lyricArr
      }
    },
    mounted() {
      this.$bus.$on("audio", a => {
        a.addEventListener("timeupdate", () => {
          //=>跳转播放时间，改变歌词
          if (a.currentTime < this.curTime || a.currentTime - this.curTime > 1) {
            this.curTime = a.currentTime;
            this.skipLyric();
          } else if (this.lyricTime[this.line] <= a.currentTime) {
            //=>正常播放
            this.line++;
            if (this.line >= this.activeLine) {
              this.$refs.lyricContent.style.transform = this.scrollH(this.line)
            }
            this.curTime = a.currentTime;
          }
          this.curTime = a.currentTime;
        });
        //=>再播放结束后或者切歌时将歌词归档
        a.addEventListener("ended", this.initLyric);
        a.addEventListener("durationchange", this.initLyric);
      });
    },
    methods: {
      initLyric() {
        this.$refs.lyricContent.style.transform = "translateY(0)";
        this.line = 0;
        this.curTime = 0;
      },
      //=>跳转歌词的方法
      skipLyric() {
        for (let i = 0; i < this.lyricTime.length; i++) {
          if (this.curTime <= this.lyricTime[i]) {
            this.line = i;
            this.$refs.lyricContent.style.transform = this.scrollH(this.line)
            return;
          }
        }
        //=>如果跳转的时间点后续没有歌词直接跳转至最后一行
        this.line = this.$refs.lyricDetail.length;
        this.$refs.lyricContent.style.transform = this.scrollH(this.$refs.lyricContent.length-1);
      },
      //=>又臭又长的
      scrollH(line) {
        //TODO 元素是v-for循环创建的，添加的统一样式，为什么个别元素的offsetHeight会比其他的少 1 像素
        //=>暂时使用判断来达到一致的offsetHeight，
        if (this.$refs.lyricDetail[line]) {
          let offsetH = (this.$refs.lyricDetail[line].offsetHeight);
          this.$refs.lyricDetail[line + 1] ? null : line--;
          if (offsetH < this.$refs.lyricDetail[line + 1].offsetHeight) {
            offsetH += 1;
          }
          return `translateY(${-offsetH * (line - this.activeLine)}px)`;
        }
      }
    },
    watch: {
      //=>在大小歌词模式下切换立即滚动到相应处
      activeLine: {
        handler: function (value) {
          if (this.line >= this.activeLine) {
            this.$refs.lyricContent.style.transform = this.scrollH(this.line)
          }
          value === 2 ? this.hide = true : this.hide = false;
        }
      },
      lyric: {
        handler: function () {
          this.lyricTime = [];
        }
      }
    },
    components: {
      Scroll,
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #lyric-container {
    width: 100%;
    text-align: center;
    transition: transform 200ms linear;
    position: absolute;
    overflow: hidden;

    .lyric-child {
      padding: 6px 0;

      .hide {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      }
    }

    .active {
      font-size: 16px;
      color: @themecolor;
      transition: all 200ms linear;
    }
  }
</style>