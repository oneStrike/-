<template>
  <div id="home">
    <div class="banner-container">
      <Banner :banners="banners"></Banner>
    </div>
    <!--    推荐列表-->
    <section class="home-content">
      <div class="classify">
        <HomeList :singer="true" title="推荐歌曲" :listData="song"></HomeList>
      </div>
      <div class="classify">
        <HomeList :count="true" :playCount="true" title="推荐歌单" :listData="songList"></HomeList>
      </div>
      <div id="mv-container">
        <nav class="mv-area">
          <h2>MV排行榜</h2>
          <ul class="area">
            <li>
              <button @click="area='内地'">内地</button>
            </li>
            <li>
              <button @click="area='欧美'">欧美</button>
            </li>
            <li>
              <button @click="area='日本'">日本</button>
            </li>
          </ul>
        </nav>
        <TopMV :mvData="topMV"></TopMV>
      </div>
    </section>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {
    getBannerData,
    getSongList,
    getSong,
    getTopMV
  } from "../../api";

  import Banner from "../../components/home/banner/Banner";
  import HomeList from "../../components/home/homeList/HomeList";
  import TopMV from "../../components/home/topMV/TopMV";

  export default {
    name: "home",
    data() {
      return {
        banners: [],
        song: [],
        songList: [],
        topMV: [],
        area: '内地',
      }
    },
    methods: {
      async getPageData() {
        try {
          this.banners = (await getBannerData()).banners;
          this.song = (await getSong()).result;
          this.songList = (await getSongList()).result;
          this.topMV = (await getTopMV(this.area)).data;
        } catch (e) {
          alert(e)
        }
      },
    },
    mounted() {
      this.getPageData()
    },
    watch: {
      area: {
        handler: async function (value) {
          this.topMV = (await getTopMV(value)).data;
        }
      }
    },
    components: {
      HomeList,
      Banner,
      TopMV
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #home {
    background: #f2f3f4;
    padding-top: 90px;

    .banner-container {
      width: 100%;
      height: 100%;
      background: @themecolor;
      position: relative;

    }

    /*  推荐列表*/

    .home-content {
      display: flex;
      flex-direction: column;

      .classify {
        height: 200px !important;
        flex-shrink: 0;
      }
    }

    #mv-container {
      width: 100%;
      height: 100%;
      margin-top: 20px;

      .mv-area {
        width: 100%;
        height: 70px;
        text-indent: 1em;
        position: relative;

        h2 {
          color: @themecolor;
          font-size: 16px;
          font-weight: bold;
        }

        .area {
          width: 100%;
          height: 40px;
          text-align: center;
          line-height: 40px;
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-around;

          button {
            width: 60px;
            height: 30px;
            border: 1px solid @themecolor;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>