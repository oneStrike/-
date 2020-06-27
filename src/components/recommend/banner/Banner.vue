<template>
  <div class="banner">
    <aside class="swiper-container" v-show="!isShow">
      <ul class="swiper-wrapper">
        <li class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <a href="">
            <img class="img-content" :src="item.imageUrl" :alt="item.typeTitle"/>
          </a>
        </li>
      </ul>
      <div class="swiper-pagination"></div>
    </aside>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from "swiper";
  import "swiper/css/swiper.min.css";

  export default {
    name: "Banner",
    data() {
      return {
        swiper: null,
      }
    },
    props: {
      banners: {
        type: Array,
        required: true,
      }
    },
    computed: {
      ...mapState({
        //=>获取播放页的显示隐藏条件，播放页展示的时候阻止轮播图
        isShow: state => state.playPage.isShow
      })
    },
    watch: {
      // 获取数据之后再初始化swiper
      banners() {
        this.$nextTick(() => {
          this.swiper = new Swiper(".swiper-container", {
            loop: true,
            autoplay: {
              disableOnInteraction: false,
              delay: 2500
            },
            pagination: {
              el: ".swiper-pagination"
            },
          });
        });
      },
      //=>解决来回切换播放页轮播图不自动轮播
      isShow() {
        this.$nextTick(() => {
          if (this.isShow) {
            this.swiper.autoplay.stop()
          } else {
            this.swiper.autoplay.start()
          }
        })
      }
    },
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .banner {
    width: 90%;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    top: 5px;
    overflow: hidden;

    /deep/ .swiper-pagination {
      span {
        background: @themecolor
      }
    }
  }
</style>