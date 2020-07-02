<template>
  <div id="app">
    <header class="header-container">
      <div class="tab-bar">
        <div @click="toggleLatelyPlay" class="left">
          <i class="iconfont icon-caidan left"></i>
        </div>
        <div class="center">
          <h1 class="center">MyMusic</h1>
        </div>
        <router-link tag="div" to="/search" class="right">
          <i class="iconfont icon-sousuosearch82 right"></i>
        </router-link>
      </div>
      <nav class="nav-bar">
        <router-link to="/home">推荐</router-link>
        <router-link to="/profile">我的</router-link>
      </nav>
    </header>
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
    <div class="mini-play">
      <MiniPlay></MiniPlay>
    </div>
    <keep-alive>
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

    .header-container {
      width: 100%;
      height: 90px;
      position: fixed;
      top: 0;
      left: 0;
      background: @themecolor;
      z-index: 10;

      .tab-bar, .nav-bar {
        height: 45px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
      }
    }

    nav {
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #e4e4e4;
        position: relative;
      }

      & .router-link-active {
        color: @fontcolor;
      }

      & .router-link-active::after {
        content: "";
        border-bottom: 2px solid @fontcolor;
        width: 30px;
        position: absolute;
        left: 50%;
        margin-left: -15px;
        top: 35px;
      }
    }

    h1 {
      font-size: 16px;
      letter-spacing: 3px;
    }

    .icon-caidan {
      font-size: 20px;
    }

    .icon-sousuosearch82 {
      font-size: 26px;
    }

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