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
        <RecommendList title="推荐电台" :djprogram="djprogram"></RecommendList>
      </div>
    </section>
    <!--    推荐内容简要-->
    <TopListDetail :topListDetail="topListDetail"></TopListDetail>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import Banner from '@recommend/banner/Banner'
  import RecommendList from '@recommend/recommendList/RecommendList';
  import TopListDetail from "@recommend/topListDetail/TopListDetail";

  export default {
    name: "recommend",
    computed: {
      ...mapState({
        banners: state => state.banners,
        songList: state => state.songList,
        song: state => state.song,
        djprogram: state => state.djprogram,
        topListDetail: state => state.topListDetail,
      })
    },
    mounted() {
      this.$store.dispatch('getbanner')
      this.$store.dispatch("getSongListContent");
      this.$store.dispatch('getSong')
      this.$store.dispatch('getDjprogram')
      this.$store.dispatch('getTopListDetail')
    },
    components: {
      RecommendList,
      TopListDetail,
      Banner
    }
  }
  ;
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #recommend {
    position: relative;

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