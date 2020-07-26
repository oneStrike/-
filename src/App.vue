<template>
  <div id="app">
    <!--    播放页面 -->
    <div class="show-palypage" v-show="showPlayPage">
      <keep-alive>
        <!--初始加载首页时并不加载播放页面， 按需加载-->
        <component :is="dynamicLoading"></component>
      </keep-alive>
    </div>
    <!--    //=>侧边栏的历史播放记录-->
    <div class="lately">
      <transition name="lately">
        <LatelyPlayList @hide-lately-play="toggleLatelyPlay" v-show="showLatelyPlay"></LatelyPlayList>
      </transition>
      <aside @touchmove.prevent v-show="showLatelyPlay" @click="toggleLatelyPlay" class="mask"></aside>
    </div>
    //=>迷你播放器
    <div class="mini-play">
      <MiniPlay></MiniPlay>
    </div>
    <!--    解决迷你播放遮挡底部内容-->
    <div v-if="playData.id" class="mask"></div>
    <keep-alive exclude="Login">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import PlayPage from '@/views/playPage/PlayPage'
  import LatelyPlayList from "./components/common/LatelyPlayList/LatelyPlayList";
  import MiniPlay from "./components/common/miniPlay/MiniPlay";

  export default {
    name: 'App',
    data() {
      return {
        showLatelyPlay: false,
      }
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        showPlayPage: state => state.playPage.showPlayPage,
        dynamicLoading: state => state.playPage.dynamicLoading,
      })
    },
    methods: {
      toggleLatelyPlay() {
        this.showLatelyPlay = !this.showLatelyPlay
      },
    },
    components: {
      PlayPage,
      LatelyPlayList,
      MiniPlay,
    },
  }
</script>
<style scoped lang="less">
  @import 'assets/less/mixins';


  #app {
    width: 100%;
    color: @fontcolor;
    position: relative;

    .mini {
      width: 100%;
      height: 45px;
      position: fixed;
      bottom: 0;
    }

    .lately {
      .mask {
        width: 75px;
        height: 100%;
        position: fixed;
        right: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 10;
        animation: active 300ms linear;
      }
    }

    .lately-enter-active {
      transition: transform 200ms linear;
      transform: translate(-100%, 0);
    }

    .lately-enter-to {
      transform: translate(0, 0);
    }

    .lately-leave-active {
      transition: transform 200ms linear;
      transform: translate(-100%, 0);
    }

    .mask {
      width: 100%;
      height: 60px;
    }
  }

  @keyframes active {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      display: block;
    }
  }
</style>