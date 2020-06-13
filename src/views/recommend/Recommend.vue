<template>
  <div id="recommend">
    <!--    轮播图-->
    <div class="banner">
      <aside class="swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item,index) in banners" :key="item.bannerId">
            <router-link to="/play">
              <img class="img-content" :src="item.pic" alt/>
            </router-link>
          </li>
        </ul>
        <div class="swiper-pagination"></div>
      </aside>
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
      <RankingList></RankingList>
    </section>
    <!--    推荐内容简要-->
      <TopListDetail :topListDetail="topListDetail"></TopListDetail>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import "swiper/css/swiper.min.css";
  import {mapState} from "vuex";
  import RecommendList from "../../components/recommendList/RecommendList";
  import RankingList from "../../components/rankingList/RankingList";
  import TopListDetail from "../../components/topListDetail/TopListDetail";

  export default {
    name: "recommend",
    data() {
      return {};
    },
    computed: {
      ...mapState({
        banners: state => state.banners,
        songList: state => state.songList,
        song: state => state.song,
        djprogram: state => state.djprogram,
        topListDetail: state => state.topListDetail
      })
    },
    methods: {},
    mounted() {
      //=>轮播图
      this.$store.dispatch("getbanner");
      //=>推荐歌单
      this.$store.dispatch("getSongListContent");
      this.$store.dispatch('getSong')
      this.$store.dispatch('getDjprogram')
      this.$store.dispatch('getTopListDetail')
    },
    // 获取数据之后再初始化swiper
    watch: {
      banners() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true,
            autoplay: {
              disableOnInteraction: false,
              delay: 2500
            },
            pagination: {
              el: ".swiper-pagination"
            },
            observe: true,
            observeParents: true
          });
        });
      }
    },
    components: {
      RecommendList,
      RankingList,
      TopListDetail
    }
  };
</script>

<style scoped lang="less">
  @import "../../assets/less/mixins";

  #recommend {
    position: relative;
    /*轮播图*/

    .banner {
      width: 100%;
      height: 135px;
      background-color: @themecolor;

      .swiper-container {
        width: 360px;
        height: 140px;
        border-radius: 8px;
        position: absolute;
        left: 50%;
        margin-left: -180px;
        top: 4px;

        /deep/ .swiper-pagination {
          span {
            background: @themecolor;
          }
        }
      }
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