<template>
  <div v-if="playData.cover"
       class="mini-play">
    <div class="cover" @click="$store.commit('setPlayStatus',{showPlayPage:true})">
      <CoverRotate border="3px" :coverURL="playData.cover"></CoverRotate>
    </div>
    <div class="song" @click="$store.commit('setPlayStatus',{showPlayPage:true})">
      <span class="song-name">{{playData.name}}</span>
      <span class="singer-name">{{playData.singer}}</span>
    </div>
    <div class="play" @click.stop="changeStatus">
      <i v-show="!isPlay" class="iconfont icon-bofang"></i>
      <i v-show="isPlay" class="iconfont icon-zanting1"></i>
    </div>
    <div class="list" @click.stop="showList=!showList">
      <i class="iconfont icon-caidan1"></i>
    </div>
    <div @touchmove.prevent v-show="showList" class="play-list-container">
      <PlayList name="mini" :singerHitSongs="singerHitSongs&&singerHitSongs"></PlayList>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import CoverRotate from "../../playPage/coverRotate/CoverRotate";
  import PlayList from "@common/playList/PlayList";
  import {getSingerHitSongs} from "../../../api";

  export default {
    name: "MiniPlay",
    data() {
      return {
        singerHitSongs: [],
        showList: false,
        singerName: ''
      };
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        latelyList: state => state.playPage.latelyList,
        isPlay: state => state.playPage.isPlay,
        showPlayPage: state => state.playPage.showPlayPage,
      })
    },
    methods: {
      changeStatus() {
        this.$store.commit('setPlayStatus', {
          play: !this.isPlay,
          effect: !this.isPlay,
        })
      }
    },
    watch: {
      playData: {
        handler: async function (value) {
          //=>如果播放的都是同一个歌手的名字，只发送一次请求，
          if (!value || value.singer === this.singer) return;
          this.singer = value.singer;
          this.singerHitSongs = [];
          try {
            let tempArr = (await getSingerHitSongs(value.singerID)).songs;
            tempArr.forEach((song) => {
              this.singerHitSongs.push({
                name: song.name,
                singer: value.singer,
                singerID: value.singerID,
                id: song.id,
                time: song.dt,
                cover: song.al.picUrl,
              })
            })
            tempArr = null;
          } catch (e) {
            alert(e)
          }
        }
      },
      showPlayPage: {
        handler: function (value) {
          value ? this.showList = false : null;
        }
      }
    },
    components: {
      CoverRotate,
      PlayList
    }
  };
</script>
<style scoped lang="less">
  @import "@less/mixins";

  .mini-play {
    width: 100%;
    height: 60px;
    font-size: 14px;
    color: #323030;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .cover {
      width: 50px;
      height: 50px;
    }

    .song {
      span {
        width: 150px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      span:nth-child(2) {
        font-size: 12px;
        color: #666666;
      }
    }

    .play {
      .iconfont {
        font-size: 28px;
        vertical-align: middle;
      }
    }

    .list {
      .iconfont {
        font-size: 28px;
        vertical-align: middle;
      }
    }

    .play-list-container {
      width: 100%;
      position: absolute;
      bottom: 60px;
      left: 0;
      background: #f2f3f4;
      overflow: hidden;
    }
  }
</style>