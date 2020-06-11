<template>
  <div id="container">
    <header class="header">
      <!--       site > 根据传参设置子元素flex的值-->
      <HeaderNav site="4">
        <template v-slot:left>
          <i class="iconfont icon-caidan"></i>
        </template>
        <template v-slot:center>
          <h1>MyMusic</h1>
        </template>
        <template v-slot:right>
          <i class="iconfont icon-sousuosearch82"></i>
        </template>
      </HeaderNav>
      <nav>
        <HeaderNav>
          <template v-slot:left>
            <router-link to="/recommend">推荐</router-link>
          </template>
          <template v-slot:center>
            <router-link to="/rank">排行</router-link>
          </template>
          <template v-slot:right>
            <router-link to="/singer">歌手</router-link>
          </template>
        </HeaderNav>
      </nav>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import HeaderNav from "./components/headerNav/HeaderNav";

  export default {
    name: 'App',
    components: {
      HeaderNav
    }
  }
</script>
<style scoped lang="less">
  @import './assets/less/mixins';

  #container {
    width: 100%;
    height: 88px;
    background: @themecolor;
    color: @fontcolor;

    nav {
      a {
        display: inline-block;
        width:100%;
        height:100%;
        color: #e4e4e4;
        position:relative;
      }

      & .router-link-active {
        color: @fontcolor;
      }

      & .router-link-active::after {
        content: "";
        border-bottom: 2px solid @fontcolor;
        width: 30px;
        position:absolute;
        left:50%;
        margin-left:-15px;
        top:35px;
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
  }
</style>
