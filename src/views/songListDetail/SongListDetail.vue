<template>
  <div @touchmove.prevent id="song-list-detail">
    <header class="title">
      <div @click="$router.go(-1)" class="back">
        <i class=" iconfont icon-fanhui"></i>
      </div>
      <h2>{{detail.name}}</h2>
    </header>
    <section class="song-list-cover">
      <div class="cover">
        <img :src="detail.coverImgUrl" alt="">
      </div>
      <!--      <div class="description">-->
      <!--        <p>{{detail.description}}</p>-->
      <!--      </div>-->
    </section>
    <section class="song-list-content">
      <Scroll :data="reSongList" :scrollY="true" :click="true" :bounce="true">
        <List @trigger-click="playSong" :listContent="reSongList"></List>
      </Scroll>
    </section>
    <div class="hint">
      <span>接口限制，登陆后才可以显示完整的歌单</span>
    </div>
  </div>
</template>

<script>
  import Scroll from "@common/scroll/Scroll";
  import List from "@common/playList/list/List";
  import {getSongListDetail} from "../../api";

  export default {
    name: "SongListDetail",
    data() {
      return {
        detail: {}
      }
    },
    props: ['id'],
    methods: {
      async getDetail() {
        try {
          this.detail = (await getSongListDetail(this.id)).playlist;
        } catch (e) {
          alert(e)
        }
      },
      playSong(song) {
        //=>如果当前的歌曲正在播放，并且点击的歌曲与当前播放的歌曲为同一首，则直接返回，不做处理
        // if (this.playData.id === song.id && this.isPlay) return;
        this.$store.commit("setPlayStatus", {
          data: song,
          showPlayPage: true,
          play: true,
          effect: true,
          dynamic: "playPage",
          latelySongID: song.id,
          lately: song,
        });
      },
    },
    computed: {
      reSongList() {
        if (!this.detail.tracks) return
        let temp = [];
        this.detail.tracks.forEach((item) => {
          temp.push({
            name: item.name,
            id: item.id,
            time: item.dt,
            cover: item.al.picUrl,
            singer: item.ar[0].name,
            singerID: item.ar[0].id,
          })
        })
        return temp
      },
    },
    mounted() {
      this.getDetail()
    },
    watch: {
      $route: {
        handler: function (n, o) {
          if (n.fullPath !== o.fullPath) {
            this.getDetail()
          }
        }
      }
    },
    components: {
      Scroll,
      List,
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #song-list-detail {
    width: 100%;
    height: 100%;
    color: #323030;
    background: #fff;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 40px;
      color: #f1f1f1;
      position: relative;
      text-align: center;
      line-height: 40px;
      z-index: 100;
      background: @themecolor;
      flex: -1;

      .back {
        width: 40px;
        height: 40px;
        display: inline-block;
        float: left;

        .iconfont {
          font-size: 25px;
          vertical-align: middle;
        }
      }

      h2 {
        display: inline-block;
        float: left;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .song-list-cover {
      position: relative;
      overflow: hidden;
      flex: 3;

      .cover {
        width: 100%;
        height: 260px;
        overflow: hidden;
      }
    }

    .song-list-content {
      width: 100%;
      /*height: 64%;*/
      position: relative;
      overflow: hidden;
      flex: 6;
    }

    .hint {
      height: 40px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      flex: -1;
      background: rgba(193, 13, 13, 0.6);
      box-shadow: 0 0 15px 15px rgba(193, 13, 13, 0.6);
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #f1f1f1;
    }
  }
</style>