<template>
  <div id="recommend">
    <!--    轮播图-->
    <div class="banner">
      <aside class="swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item,index) in banners" :key="item.bannerId">
            <router-link to="/play">
              <img class="img-content" :src="item.pic" alt="">
            </router-link>
          </li>
        </ul>
        <div class="swiper-pagination"></div>
      </aside>
    </div>
    <!--    推荐列表-->
    <section class="recommend-content">
      <div class="classify">
        <RecommendList :songList="songList"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :songList="songList"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :songList="songList"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :songList="songList"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :songList="songList"></RecommendList>
      </div>
      <div class="classify">
        <RecommendList :songList="songList"></RecommendList>
      </div>
    </section>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/css/swiper.min.css'
  import {mapState} from 'vuex'
  import RecommendList from "../../components/recommendList/RecommendList";

  export default {
    name: "recommend",
    data() {
      return {}
    },
    computed: {
      ...mapState({
        banners: state => state.banners,
        songList: state => state.songList
      })
    },
    methods: {},
    mounted() {
      //=>轮播图
      this.$store.dispatch('getbanner',);
      //=>推荐歌单
      this.$store.dispatch('getSongListContent')
    },
    // 获取数据之后再初始化swiper
    watch: {
      banners() {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
              disableOnInteraction: false,
              delay: 2500,
            },
            pagination: {
              el: ".swiper-pagination"
            },
            observe: true,
            observeParents: true,
          })
        })
      }
    },
    components: {
      RecommendList
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/less/mixins';

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
      }
    }

    /*  推荐列表*/

    .recommend-content {
      display: flex;
      flex-direction: column;
      .classify{
        height:200px;
        flex-shrink: 0;
      }
    }
  }
</style>