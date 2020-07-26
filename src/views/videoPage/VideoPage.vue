<template>
  <div id="video">
    <!--    头部-->
    <header class="title">
      <div @click="$router.go(-1)" class="back">
        <i class=" iconfont icon-fanhui"></i>
      </div>
      <h2>{{mvData.name}}</h2>
      <div class="home" @click="$router.push({path:'/home'})">
        <i class="iconfont icon-ico-"></i>
      </div>
    </header>
    <!--    视频-->
    <div class="video">
      <video @ended="playing=false" @click="status=!status" ref="video" width="100%" :src="mvUrl" autoplay
             :poster="mvData.cover"></video>
      <div class="control">
        <span>{{curTime|reTime}}</span>
        <div ref="all" class="all-progress" @click.stop="skipPlay">
          <div ref="cur" class="cur-progress"></div>
        </div>
        <span>{{mvData.duration|reTime}}</span>
      </div>
      <div v-show="status" class="status" @click.prevent="toggleStatus">
        <i v-show="playing" class="iconfont icon-zanting1"></i>
        <i v-show="!playing" class="iconfont icon-bofang"></i>
      </div>
      <div class="extend-play" v-show="curExtend.show">
        <span>
          上次播放到
          <strong @click="extendPlay">{{curExtend.time|reTime}}</strong>，
          是否继续播放
        </span>
      </div>
    </div>
    <!--    简介-->
    <div ref="des" class="description">
      <span class="de-title">mv简介:</span>
      <p ref="content" class="hide">{{mvData.desc||'该mv没有简介'}}</p>
      <button ref="btn" @click="showMoreDes" class="show-hidden">
        <i v-show="!desShow" class="iconfont icon-xiajiantou"></i>
        <i v-show="desShow" class="iconfont icon-shangjiantou"></i>
      </button>
    </div>
    <!--    推荐-->
    <div class="related">
      <TopMV :mvData="simiMv"></TopMV>
    </div>
  </div>
</template>

<script>
  import {getMVDetail, getMvUrl, getSimiMv} from "../../api";
  import {utils} from "../../utils/utils";
  import {mapState} from 'vuex';
  import TopMV from "../../components/home/topMV/TopMV";

  export default {
    name: "VideoPage",
    data() {
      return {
        mvData: {},//mv数据
        mvUrl: '',//mv播放地址
        simiMv: [],//相似mv
        curTime: 0,//mv播放的当前事件
        ratio: 0,//播放比例
        playing: true,//是否播放中
        status: false,//播放状态
        timer: 0,//定时器
        desShow: false,//展示简介
        curExtend: {},
        extendContainer: [],
        extendTimer: '',
      }
    },
    props: ['id'],
    computed: {
      ...mapState({
        isPlay: state => state.playPage.isPlay,
      })
    },
    methods: {
      toggleStatus() {
        this.playing ? this.$refs.video.pause() : this.$refs.video.play();
        this.playing = !this.playing;
      },
      skipPlay(e) {
        if (!this.$refs.video.currentTime) return;
        this.$refs.cur.style.width = e.offsetX + "px";
        let ratio =
          this.$refs.video.duration / this.$refs.all.offsetWidth;
        this.$refs.video.currentTime = this.$refs.cur.offsetWidth * ratio;
      },
      //=>展示更多的mv简介
      showMoreDes() {
        if (!this.desShow) {
          this.$refs.content.style.width = '100%';
          this.$refs.des.style.height = 'auto';
        } else {
          this.$refs.content.style.width = '90%';
          this.$refs.des.style.height = '38px';
        }
        this.$refs.content.classList.toggle('hide')
        this.desShow = !this.desShow;
      },
      //=>请求mv数据
      async refresh() {
        if (!this.id) return;
        try {
          this.mvData = (await getMVDetail(this.id)).data;
          this.mvUrl = (await getMvUrl(this.id)).data.url;
          this.simiMv = (await getSimiMv(this.id)).mvs;
          //=>返回五个类似的mv，只要四个
          this.simiMv.pop();
        } catch (e) {
          alert(e)
        }
      },
      extendPlay() {
        this.$refs.video.currentTime = this.curExtend.time;
        this.curExtend = {};
      }
    },
    mounted() {
      this.$store.commit('setPlayStatus', {
        play: false,
        effect: false,
        showPlayPage: false,
      })
      this.refresh()
      this.$nextTick(() => {
        if (!this.$refs.video) return
        this.$refs.video.addEventListener('timeupdate', () => {
          this.curTime = this.$refs.video.currentTime;
          this.ratio = (this.curTime / this.$refs.video.duration) * 100;
          this.$refs.cur.style.width = this.ratio + "%";
        });
      })
    },
    beforeRouteLeave(to, from, next) {
      this.mvUrl = '';
      next();
    },
    filters: {
      reTime(t) {
        return utils.reTime(t);
      }
    },
    watch: {
      status: {
        handler: function (value) {
          if (value) {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.status = false;
            }, 5000)
          }
        }
      },
      $route: {
        handler: function (n, o) {
          if (n.meta.name === 'mv') {
            //=>手动暂停歌曲，还以为浏览器会自动暂停
            this.$store.commit('setPlayStatus', {
              play: false,
              effect: false,
              showPlayPage: false,
            })
            this.refresh()

            //=>不知道时接口的不稳定还是我网络的问题，调试的时候基本都是处于视频卡死的状态，暂时不处理从主页进入展示播放时间记录了
            if (!o.params.id) return;
            for (let i = 0; i < this.extendContainer.length; i++) {
              //=>如果这个mv已经播放过了，并且播放的时间少于总时间-10才显示
              if (
                this.extendContainer[i].id === n.params.id &&
                (this.extendContainer[i].time - 10) < this.$refs.video.duration
              ) {
                this.curExtend = this.extendContainer[i];
              }
            }
            this.extendTimer && clearTimeout(this.extendTimer);
            this.extendTimer = setTimeout(() => {
              this.curExtend = {};
            }, 5000)
            //=>如果这个mv已经播放过一次了，就更新播放时间
            for (let i = 0; i < this.extendContainer.length; i++) {
              if (this.extendContainer[i].id === o.params.id) {
                this.extendContainer[i].time = this.$refs.video.currentTime;
                return;
              }
            }
            this.extendContainer.push({
              time: this.$refs.video.currentTime,
              id: o.params.id,
              show: true,
            })
          }
        }
      }
    },
    components: {
      TopMV
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #video {
    width: 100%;
    height: 100%;
    background: gray;
    z-index: 100;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: scroll;

    .title {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: @themecolor;

      .back, .home {
        width: 40px;
        height: 40px;
        display: inline-block;
        float: left;

        .iconfont {
          font-size: 20px;
          vertical-align: middle;
        }
      }

      .home {
        float: right;
      }

      h2 {
        width: 300px;
        font-size: 18px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        top: 0;
        left: 40px;
      }
    }

    .video {
      width: 100%;
      background: black;
      position: relative;

      .control {
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .all-progress {
          width: 270px;
          height: 6px;
          background: #323030;
          border-radius: 10px;
          overflow: hidden;

          .cur-progress {
            width: 0;
            height: 100%;
            background: @themecolor;
          }
        }
      }

      .status {
        width: 88px;
        height: 88px;
        text-align: center;
        line-height: 88px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .iconfont {
          font-size: 50px;
          vertical-align: middle;
        }
      }

      .extend-play {
        width: 100%;
        height: 30px;
        font-size: 14px;
        position: absolute;
        bottom: 20px;
        left: 0;

        strong {
          font-size: 16px;
          color: @themecolor;
        }
      }
    }

    .description {
      width: 100%;
      height: 40px;
      overflow: hidden;
      padding-top: 10px;
      font-size: 16px;
      position: relative;

      .de-title {
        font-size: 18px;
      }

      p {
        width: 90%;
        line-height: 20px;
        font-size: 12px;
        text-indent: 4em;
      }

      & .hide {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .show-hidden {
        display: block;
        width: 10%;
        height: 25px;
        position: absolute;
        bottom: 0;
        right: 0;
        background: transparent;

        .iconfont {
          font-size: 30px;
          color: @themecolor;
        }
      }
    }

    .related {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>