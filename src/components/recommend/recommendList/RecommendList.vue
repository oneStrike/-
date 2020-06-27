<template>
  <div class="recommend-list">
    <div class="title">
      <h3>{{title}}</h3>
    </div>
    <!--    歌曲列表-->
    <div v-if="song" class="wrapper-song">
      <ul class="content">
        <li v-for="item in song" :key="item.id">
          <figure>
            <!--          lazyload实现图片懒加载-->
            <img
                    v-lazy="item.picUrl"
                    :alt="item.copywriter"
                    @click="playCurrentSong({cover:item.picUrl,id:item.id,name:item.name,singer:item.song.artists[0].name,time:item.song.bMusic.playTime,singerID:item.song.artists[0].id})"
            />
            <figcaption>{{item.name}}</figcaption>
            <span>{{item.song.artists[0].name}}</span>
          </figure>
        </li>
      </ul>
    </div>
    <!--    歌单列表-->
    <div v-if="songList" class="wrapper-songList">
      <ul class="content">
        <li v-for="item in songList" :key="item.id">
          <figure>
            <div class="play-count">
              <i class="iconfont icon-erji"></i>
              <span>{{item.playCount|rePlayCount}}</span>
            </div>
            <!--          lazyload实现图片懒加载-->
            <img v-lazy="item.picUrl" :alt="item.copywriter"/>
            <figcaption>{{item.name}}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
    <!--    电台列表-->
    <div v-if="radio" class="wrapper-radio">
      <ul class="content">
        <li v-for="item in radio" :key="item.id">
          <figure>
            <!--          lazyload实现图片懒加载-->
            <img v-lazy="item.picUrl" :alt="item.copywriter"/>
            <figcaption>{{item.name}}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {utils} from "@/utils/utils";
  import {mapState} from "vuex";

  export default {
    name: "RecommendList",
    props: {
      song: {
        type: Array
      },
      songList: {
        type: Array
      },
      radio: {
        type: Array
      },
      title: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState({
        isPlay: state => state.playPage.isPlay,
        playData: state => state.playPage.playData
      })
    },
    methods: {
      initScroll(container) {
        new BScroll(container, {
          scrollX: true,
          eventPassthrough: "vertical"
        });
      },
      playCurrentSong(songInfo) {
        if (!this.playData.id) {
          //=>按需加载播放页面，this.playData.id为空说明时第一次进入播放页面
          this.$store.commit("setPlayStatus", {
            data: songInfo,
            showPlayPage: true,
            play: true,
            effect: true,
            dynamic: "playPage",
            latelySongID: songInfo.id,
            lately: songInfo,
          });
          this.$store.dispatch("getSongURL", this.playData.id);
          this.$store.dispatch("getLyric", this.playData.id);
          return;
        }
        if (this.playData.id === songInfo.id) {
          //=>this.playData.id === songInfo.id说明点击的都是同一首歌曲，只有当这首歌是播放状态才开始旋转和定时器
          if (this.isPlay) {
            this.$store.commit("setPlayStatus", {
              showPlayPage: true,
              effect: true
            });
          }
          this.$store.commit("setPlayStatus", {
            showPlayPage: true,
            effect: false
          });
          return;
        }
        if (this.playData.id !== songInfo.id) {
          this.$store.commit("setPlayStatus", {
            showPlayPage: true,
            data: songInfo,
            play: true,
            effect: true
          });
          this.$store.dispatch("getSongURL", this.playData.id);
        }
      }
    },
    filters: {
      //=>格式化歌单的播放次数
      rePlayCount(playCount) {
        return utils.reNum(playCount);
      }
    },
    watch: {
      song() {
        this.$nextTick(() => {
          this.initScroll(".wrapper-song");
        });
      },
      songList() {
        this.$nextTick(() => {
          this.initScroll(".wrapper-songList");
        });
      },
      radio() {
        this.$nextTick(() => {
          this.initScroll(".wrapper-radio");
        });
      }
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .recommend-list {
    width: 100%;
    height: 100%;
    overflow: hidden;

    ul {
      display: flex;
      flex-wrap: nowrap;
      color: #666666;
      min-width: 100%;
      float: left;
      height: 150px !important;

      li {
        width: 100px;
        margin-left: 8px;
        flex-shrink: 0;
        text-align: center;

        figure {
          margin: 0;
          position: relative;

          figcaption {
            //多行显示省略号，只适用于webkit内核的浏览器
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .play-count {
            position: absolute;
            color: @fontcolor;
            right: 6px;
            letter-spacing: 1px;

            .iconfont {
              font-size: 14px;
            }
          }
        }
      }
    }

    .title {
      font-size: 16px;
      color: @themecolor;
      height: 40px;
      text-indent: 1em;
      margin-top: 20px;

      h3 {
        font-weight: 700;
      }
    }

    .wrapper {
      width: 100%;
      position: absolute;
      overflow: hidden;
    }
  }
</style>