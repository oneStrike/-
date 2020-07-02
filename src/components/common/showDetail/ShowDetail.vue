<template>
  <div id="show-detail">
    <header class="title">
      <span class="back" @click="$emit('trigger-back')">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <h2>{{title}}</h2>
    </header>
    <div v-show="!loading" class="cover">
      <img :src="cover" alt="">
    </div>
    <div class="play-all">
        <span @click="$emit('play-all')">
          <i class="iconfont icon-bofang"></i>
          播放全部
        </span>
      <span>
        收藏 :  {{collect}}
      </span>
    </div>
    <div v-show="loading" class="loading">
      <img src="@/assets/images/loading2.gif" alt="">
    </div>
    <section v-show="!loading" class="list-content">
      <Scroll :data="data" :click="true" :scroll-y="true" :bounce="true">
        <List :del="false" @trigger-click="playSong" :listContent="data"></List>
      </Scroll>
    </section>
  </div>
</template>

<script>
  import List from "../list/List";
  import Scroll from "../scroll/Scroll";
  import {mapState} from 'vuex'

  export default {
    name: "ShowDetail",
    props: {
      data: {
        type: Array,
        default: null,
      },
      title: {
        type: String,
        default: null,
      },
      cover: {
        type: String,
        default: null,
      },
      collect: {
        type: Number,
        default: 0,
      },
      loading: {
        type: Boolean,
        required: false,
      }
    },
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
      })
    },
    methods: {
      playSong(song) {
        this.$store.commit("setPlayStatus", {
          data: song,
          showPlayPage: true,
          play: true,
          effect: true,
          dynamic: "playPage",
        });
      }
    },
    components: {
      List,
      Scroll
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #show-detail {
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 45px;
      background: @themecolor;
      line-height: 45px;
      position: fixed;
      top: 0;
      z-index: 1;

      .back {
        float: left;
        width: 45px;
        height: 45px;

        .iconfont {
          font-size: 22px;
          color: #fff;
          vertical-align: middle;
        }
      }

      h2 {
        float: left;
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .cover {
      width: 100%;
      height: 260px;

      img {
        width: 100%;
        height: 100%;
      }

    }

    .play-all {
      width: 100%;
      height: 45px;
      font-size: 14px;
      line-height: 45px;
      color: #ffffff;
      background: @themecolor;

      span:nth-child(1) {
        width: 50%;
        display: inline-block;
        box-sizing: border-box;
        border-right: 1px solid black;

        .iconfont {
          font-size: 28px;
          vertical-align: middle;
        }
      }

      span:nth-child(2) {
        width: 50%;
        display: inline-block;
      }
    }

    .list-content {
      height: 0;
      flex: auto;
    }
  }
</style>