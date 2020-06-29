<template>
  <div id="recommend">
    <div class="banner-container">
      <Banner :banners="banners"></Banner>
    </div>
    <!--    推荐列表-->
    <section class="recommend-content">
      <div class="classify">
        <RecommendList :singer="true" title="推荐歌曲" :listData="song"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :count="true" :playCount="true" title="推荐歌单" :listData="songList"></RecommendList>
      </div>
      <!--      没有找到对应的播放接口，使用推荐的视频替代-->
      <!--      <div class="classify">-->
      <!--        <RecommendList title="推荐电台" :listData="radio"></RecommendList>-->
      <!--      </div>-->
      <!--    推荐内容简要-->
      <!--      <TopListDetail :topListDetail="topListDetail"></TopListDetail>-->
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
        <TopMV @reload="refresh" :mvData="topMV"></TopMV>
      </div>
    </section>
    <keep-alive>
      <router-view v-if="reload"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {
    getBannerData, getSongList, getSong,
    getTopMV
    // getTopListDetail, getRadio
  } from "../../api";
  import Banner from '@recommend/banner/Banner'
  import RecommendList from '@recommend/recommendList/RecommendList';
  import TopMV from "../../components/recommend/topMV/TopMV";
  // import TopListDetail from "@recommend/topListDetail/TopListDetail";

  export default {
    name: "recommend",
    data() {
      return {
        banners: [],
        song: [],
        songList: [],
        topMV: [],
        area: '内地',
        reload: true,
        // radio: [],
        // topListDetail: [],
      }
    },
    methods: {
      refresh() {
        this.reload = false;
        this.$nextTick(() => {
          this.reload = true;
        })
      },
      async getPageData() {
        try {
          this.banners = (await getBannerData()).banners;
          this.song = (await getSong()).result;
          this.songList = (await getSongList()).result;
          this.topMV = (await getTopMV(this.area)).data;
          // this.radio = (await getRadio()).result;
          // this.topListDetail = (await getTopListDetail()).list.splice(0, 4)
        } catch (e) {
          alert(e)
        }
      }
    },
    async mounted() {
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
      RecommendList,
      // TopListDetail,
      Banner,
      TopMV
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #recommend {
    position: absolute;
    width: 100%;
    background: #f2f3f4;
    top: 88px;

    .banner-container {
      width: 100%;
      height: 100%;
      background: @themecolor;
      position: relative;
    }

    /*  推荐列表*/

    .recommend-content {
      display: flex;
      flex-direction: column;

      .classify {
        height: 200px;
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