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
    <section class="cover">
      <CoverRotate :coverURL="playData.cover"></CoverRotate>
    </section>
    <footer class="control">
      <playSong :playURL="playURL"></playSong>
    </footer>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import CoverRotate from '@playpage/coverRotate/CoverRotate';
  import PlaySong from '@playpage/playSong/PlaySong';

  export default {
    name: "PlayPage",
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        playURL: state => state.playPage.playURL,
        timer: state => state.playPage.timer,
      })
    },
    methods: {
      hide() {
        this.$store.commit('playShow', false)
        //=>无视播放状态，只要隐藏播放页面就清除定时器和停止封面旋转
        this.$store.commit('setRotateAndTimer', false)
      }
    },
    mounted() {
      //=>在当前页面刷新浏览器，会清空vuex的数据，没有数据时则将播放页面隐藏
      if (!(this.playData.name)) {
        this.$store.commit('playShow', false)
        return;
      }
      //=>正常点击进入的播放页面
      this.$store.commit('playShow', true)
      this.$store.commit('setIsPlay', true)
      this.$store.commit('setRotateAndTimer', true)
    },
    components: {
      CoverRotate,
      PlaySong,
    }
  }
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

    .control {
      width: 100%;
      height: 200px;
      position: fixed;
      bottom: 0;
    }
  }
</style>