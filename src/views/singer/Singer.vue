<template>
  <div id="singer">
    <header class="title">
      <span calss="singer-back" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <h2>热门歌手分类</h2>
      <span @click="$router.replace({path:'/search'})">
           <i class="iconfont icon-sousuosearch82 right"></i>
      </span>
    </header>
    <nav class="singer-classify">
      <ul class="singer-area">
        <li :class="{'active':area===-1}">全部</li>
        <li :class="{'active':area===7}">华语</li>
        <li :class="{'active':area===8}">日本</li>
        <li :class="{'active':area===16}">韩国</li>
        <li :class="{'active':area===96}">欧美</li>
      </ul>
      <ul class="singer-type">
        <li :class="{'active':type===-1}">全部</li>
        <li :class="{'active':type===1}">男歌手</li>
        <li :class="{'active':type===2}">女歌手</li>
      </ul>
    </nav>
    <section class="singer-content">
      <Scroll :data="singersData" :click="true" :scroll-y="true" :bounce="true" :pullUpload="true"
              @scrollToEnd="pullUpload">
        <List :cover="true" :del="false" :list-content="singersData"></List>
      </Scroll>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingers} from "../../api";
  import Scroll from "../../components/common/scroll/Scroll";
  import List from "../../components/common/list/List";

  export default {
    name: "Singer",
    data() {
      return {
        type: -1,
        area: -1,
        singersData: [],
        allSinger: {all: [], male: [], songBird: []},
        chinaSinger: {all: [], male: [], songBird: []},
        japanSinger: {all: [], male: [], songBird: []},
        bangziSinger: {all: [], male: [], songBird: []},
        westernSinger: {all: [], male: [], songBird: []},
      }
    },
    methods: {
      async getSinger(type = -1, area = -1) {
        try {
          this.allSinger.all = (await getSingers(type, area)).artists;
          this.singersData = this.allSinger.all;
        } catch (e) {
          alert(e)
        }
      },
      pullUpload() {

      },
    },
    mounted() {
      this.getSinger()
    },
    components: {
      Scroll,
      List,
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #singer {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    color: #444141;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 45px;
      background: @themecolor;
      line-height: 45px;
      text-align: center;
      color: #fff;

      span {
        width: 45px;
        height: 45px;
        float: left;

        .iconfont {
          font-size: 30px;
          vertical-align: middle;
        }
      }

      span:nth-of-type(2) {
        float: right;
      }

      h2 {
        float: left;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .singer-classify {
      width: 100%;
      height: 100px;
      text-align: center;
      background: #fff;

      ul {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        padding-top: 12px;

        li {
          width: 45px;
          height: 25px;
          line-height: 25px;
          float: left;
          margin: 0 10px;
          border-radius: 12px;
          background: #dfdcdc;
        }

        & .active {
          color: #fff;
          background: @themecolor
        }
      }
    }

    .singer-content {
      height: 0;
      flex: 1;
    }
  }
</style>