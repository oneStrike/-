<template>
  <!-- @touchmove.prevent 阻止底层内容滚动-->
  <aside class="lately-container">
    <header ref="title" class="lately-header">
      <div class="title">
        <!-- 点击空白处隐藏-->
        <div class="left" @click="$emit('hide-lately-play')">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="center" :class="{'active':active}" @click="active=true">
          <h3>播放列表</h3>
        </div>
        <div class="right" :class="{'active':!active}" @click="active=false">
          <h3>歌单列表</h3>
        </div>
      </div>
      <div class="all-play" @click="playAll">
        <span>
          <i class="iconfont icon-bofang"></i>
        </span>
        <span>全部播放</span>
        <span>(共{{active?latelyList.length:playSongList.length}}首)</span>
      </div>
    </header>
    <section v-show="active" class="lately-content">
      <List @trigger-click="playSong" @trigger-del="deleteLately" :list-content="latelyList"></List>
    </section>
    <section v-show="!active" class="lately-content">
      <List @trigger-click="playSong" :del="false" :list-content="playSongList"></List>
    </section>
  </aside>
</template>
L
<script>
  import {mapState} from "vuex";
  import List from "../list/List";

  export default {
    name: "LatelyPlayList",
    data() {
      return {
        active: true,
      };
    },
    props: {
      initPosition: Boolean
    },
    computed: {
      ...mapState({
        latelyList: state => state.playPage.latelyList,
        latelySongID: state => state.playPage.latelySongID,
        playSongList: state => state.playPage.playSongList,
        playData: state => state.playPage.playData,
        isPlay: state => state.playPage.isPlay,
        playMode: state => state.playPage.playMode,
      })
    },
    methods: {
      //=>播放历史歌曲
      playSong(song) {
        if (this.playData.id === song.id && this.isPlay) return;
        this.$store.commit("setPlayStatus", {
          data: song,
          play: true,
          effect: true,
        });
      },
      //=>删除某一项,删除当前歌曲不做下一曲处理，继续播放删除的歌曲
      deleteLately(song) {
        //根据id删除
        let i = this.latelySongID.indexOf(song.id)
        this.latelyList.splice(i, 1)
        this.latelySongID.splice(i, 1)
      },
      //=>从头开始全部播放
      playAll() {
        if (this.active) {
          this.$store.commit('setPlayStatus', {
            data: this.latelyList[0],
            effect: true,
            mode: true,
          })
        } else {
          this.$store.commit('setPlayStatus', {
            data: this.playSongList[0],
            effect: true,
            mode: false
          })
        }
      },
    },
    components: {
      List,
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .lately-container {
    width: 300px;
    height: 100%;
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    overflow: scroll;
    background: #fff;

    .lately-header {
      width: 300px;
      position: fixed;
      top: 0;
      z-index: 20;

      .title {
        width: 100%;
        height: 45px;
        background: @themecolor;
        display: flex;
        justify-content: space-around;

        .center,
        .right {
          font-size: 14px;
          flex: 3;
          text-align: center;
          line-height: 45px;
          position: relative;
          color: @fontcolor;
        }

        .left {
          flex: 1;
          text-align: center;
          line-height: 45px;
          color: @fontcolor;
        }

        .active::after {
          content: "";
          border-bottom: 2px solid @fontcolor;
          width: 60px;
          position: absolute;
          left: 50%;
          margin-left: -30px;
          bottom: 5px;
        }
      }

      .all-play {
        width: 100%;
        height: 45px;
        background: @themecolor;
        line-height: 45px;
        padding-left: 10px;
        box-sizing: border-box;

        span:nth-child(1) {
          .iconfont {
            font-size: 30px;
            vertical-align: middle;
          }
        }

        span:nth-child(2) {
          font-size: 16px;
          padding: 0 5px;
        }
      }
    }

    .lately-content {
      padding-top: 90px;
      width: 100%;
    }
  }
</style>