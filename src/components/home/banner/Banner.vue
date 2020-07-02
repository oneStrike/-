<template>
  <div class="banner">
    <aside class="swiper-container" v-show="!isShow">
      <ul class="swiper-wrapper">
        <li @click="playSong(item.targetId)" class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <a href="javascript:">
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
  import {getBannerSongDetail} from '../../../api/index'
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
    methods: {
      //=>提取banner图对应的歌曲信息b并播放，
      //=> TODO 有些封面接口并不会返回数据，可能是需要VIP吧
      async playSong(id) {
        try {
          let temp = {};
          ({
            name: temp.name,
            id: temp.id,
            dt: temp.time,
            al: {
              picUrl: temp.cover,
            },
            ar: [
              {
                name: temp.singer,
                id: temp.singerID,
              }
            ]

          } = (await getBannerSongDetail(id)).songs[0]);
          this.$store.commit('setPlayStatus', {
            data: temp,
            showPlayPage: true,
            play: true,
            effect: true,
            dynamic: "playPage",
            latelySongID: temp.id,
            lately: temp,
          })
        } catch (e) {
          //=> TODO 暂时不做从历史播放记录中删除的操作
          alert('歌曲需要vip')
        }
        ``
      }
    },
    computed: {
      ...mapState({
        //=>获取播放页的显示隐藏条件，播放页展示的时候阻止轮播图
        isShow: state => state.playPage.showPlayPage,
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
          this.isShow ?
            this.swiper.autoplay.stop() :
            this.swiper.autoplay.start()

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