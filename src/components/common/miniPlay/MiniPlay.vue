<template>
  <div v-if="playData.id"
       class="mini-play">
    <div class="cover" @click="$store.commit('setPlayStatus',{showPlayPage:true})">
      <CoverRotate border="3px" :coverURL="playData.cover"></CoverRotate>
    </div>
    <div class="song" @click="$store.commit('setPlayStatus',{showPlayPage:true})">
      <span class="song-name">{{playData.name}}</span>
      <span class="singer-name">{{playData.singer}}</span>
    </div>
    <div class="control">
      <PlayControl :play-tag="playTag" :modeShow="false" :collect="false"></PlayControl>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import CoverRotate from "../../playPage/coverRotate/CoverRotate";
  import PlayControl from "../../playPage/playControl/PlayControl";

  export default {
    name: "MiniPlay",
    data() {
      return {
        playTag: '',
      }
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
        showPlayPage: state => state.playPage.showPlayPage,
      })
    },
    mounted() {
      this.$bus.$on('audio', (a) => this.playTag = a);
    },
    components: {
      CoverRotate,
      PlayControl,
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
    z-index: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .cover {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    .song {
      flex: 1;

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

    .control {
      flex: 1;
      width: 200px;
      position: relative;
      bottom: -60px;
    }
  }
</style>