<template>
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
</template>

<script>

  export default {
    name: "Header",
    data() {
      return {
        showLatelyPlay: false,
      }
    },
    methods: {
      toggleLatelyPlay() {
        this.showLatelyPlay = !this.showLatelyPlay
      },
    },
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .header-container {
    width: 100%;
    height: 90px;
    position: fixed;
    top: 0;
    left: 0;
    background: @themecolor;
    z-index: 1;
    color: @fontcolor;

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
</style>