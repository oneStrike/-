<template>
  <div id="recommend">
    <div class="banner-container">
      <Banner :banners="banners"></Banner>
    </div>
    <!--    推荐列表-->
    <section class="recommend-content">
      <div class="classify">
        <RecommendList :singer="true" title="推荐歌曲" :song="song"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :playCount="true" title="推荐歌单" :songList="songList"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList title="推荐电台" :radio="radio"></RecommendList>
      </div>
      <!--    推荐内容简要-->
      <TopListDetail :topListDetail="topListDetail"></TopListDetail>
    </section>
  </div>
</template>
<script>
  import {getBannerData, getSongList, getSong, getTopListDetail, getRadio} from "../../api";
  import Banner from '@recommend/banner/Banner'
  import RecommendList from '@recommend/recommendList/RecommendList';
  import TopListDetail from "@recommend/topListDetail/TopListDetail";

  export default {
    name: "recommend",
    data() {
      return {
        banners: [],
        song: [],
        songList: [],
        radio: [],
        topListDetail: [],
      }
    },
    async mounted() {
      try {
        this.banners = (await getBannerData()).banners;
        this.song = (await getSong()).result;
        this.songList = (await getSongList()).result;
        this.radio = (await getRadio()).result;
        this.topListDetail = (await getTopListDetail()).list.splice(0, 4)
      } catch (e) {
        alert(e)
      }
    },
    components: {
      RecommendList,
      TopListDetail,
      Banner
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
  }
</style>