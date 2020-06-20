<template>
  <div id="container">
    <header class="header">
      <HeaderNav site="6">
        <template>
          <div @click="toggleLatelyPlay" class="left">
            <i class="iconfont icon-caidan left"></i>
          </div>
          <div class="center">
            <h1 class="center">MyMusic</h1>
          </div>
          <div class="right">
            <i class="iconfont icon-sousuosearch82 right"></i>
          </div>
        </template>
      </HeaderNav>
      <nav>
        <HeaderNav>
          <template>
            <router-link to="/recommend">推荐</router-link>
            <router-link to="/profile">我的</router-link>
          </template>
        </HeaderNav>
      </nav>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--    播放页面 -->
    <transition name="play">
      <div class="show-palypage" v-show="playShow">
        <keep-alive>
          <!--初始加载首页时并不加载播放页面， 按需加载-->
          <component :is="dynamicLoading"></component>
        </keep-alive>
      </div>
    </transition>
    <!--    //=>侧边栏的历史播放记录-->
    <transition name="lately">
      <LatelyPlayList @hide-lately-play="toggleLatelyPlay" v-show="showLatelyPlay"></LatelyPlayList>
    </transition>

  </div>
</template>
<script>
  import {mapState} from "vuex";
  import HeaderNav from "@common/headerNav/HeaderNav";
  import PlayPage from '@/views/playPage/PlayPage'
  import LatelyPlayList from '@common/LatelyPlayList/LatelyPlayList'

  export default {
    name: 'App',
    data() {
      return {
        showLatelyPlay: false,
      }
    },
    computed: {
      ...mapState({
        playShow: state => state.playPage.isShow,
        dynamicLoading: state => state.playPage.dynamicLoading,
      })
    },
    methods: {
      toggleLatelyPlay() {
        this.showLatelyPlay = !this.showLatelyPlay
      }
    },
    components: {
      HeaderNav,
      PlayPage,
      LatelyPlayList
    },
  }
</script>
<style scoped lang="less">
  @import 'assets/less/mixins';

  #container {
    width: 100%;
    height: 88px;
    background: @themecolor;
    color: @fontcolor;
    position: relative;

    .header {
      .center {
        flex: 3;
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

    .play-enter-active {
      animation: play-show 500ms linear
    }

    .play-leave-active {
      animation: play-hide 500ms linear;
    }

    .lately-enter-active {
      transition: all 300ms linear;
      transform: translate(-100%, 0);
      background: rgba(0, 0, 0, 0);
    }

    .lately-enter-to {
      transform: translate(0, 0);
    }

    .lately-leave-active {
      transition: all 300ms linear;
      transform: translate(-100%, 0);
      background: rgba(0, 0, 0, 0);
    }
  }

  //展示播放页面的动画
  @keyframes play-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes play-hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>