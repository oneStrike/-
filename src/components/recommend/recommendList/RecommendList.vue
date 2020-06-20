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
            <img v-lazy="item.picUrl" :alt="item.copywriter"
                 @click="playCurrentSong({cover:item.picUrl,id:item.id,name:item.name,singer:item.song.artists[0].name,time:item.song.bMusic.playTime})"/>
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
    <div v-if="djprogram" class="wrapper-djprogram">
      <ul class="content">
        <li v-for="item in djprogram" :key="item.id">
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
  import BScroll from 'better-scroll';
  import {utils} from '@/utils/utils';
  import {mapState} from "vuex"

  export default {
    name: "RecommendList",
    data() {
      return {
        songID: null,
        repetitionSong: [],
      }
    },
    props: {
      song: {
        type: Array
      },
      songList: {
        type: Array
      },
      djprogram: {
        type: Array,
      },
      title: {
        type: String,
        required: true
      },
    },
    computed: {
      ...mapState({
        isPlay: state => state.playPage.isPlay
      })
    },
    methods: {
      initScroll(container) {
        new BScroll(container, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      },
      //如果请求较慢时，点击时则无法获取数据，没有数据时不做任何处理
      playCurrentSong(songInfo) {
        if (!songInfo) return
        this.$store.commit('getPlayData', songInfo);
        this.$store.commit('playShow', true);
        this.$store.dispatch('getSongURL', songInfo.id);
        //=>如果没有此项判断，会无视播放状态直接开启定时器和封面旋转，
        if (!this.songID) {
          //=>按需加载播放页面，this.songID为空说明时第一次进入播放页面
          this.$store.commit('dynamic', 'playPage');
          this.songID = songInfo.id;
          this.repetitionSong.push(songInfo.id);
          this.$store.commit('setLatelyList', songInfo)
          return;
        }
        if (this.songID === songInfo.id && this.isPlay) {
          //=>this.songID === songInfo.id说明点击的都是同一首歌曲，只有当这首歌是播放状态才开始旋转和定时器
          this.$store.commit('setRotateAndTimer', true);
          this.songID = songInfo.id;
          return
        }
        if (this.songID !== songInfo.id) {
          this.$store.commit('setRotateAndTimer', true);
          this.songID = songInfo.id;
          if (this.repetitionSong.indexOf(songInfo.id) === -1) {
            this.repetitionSong.push(songInfo.id);
            this.$store.commit('setLatelyList', songInfo)
          }
        }
      }
    },
    filters: {
      //=>格式化歌单的播放次数
      rePlayCount(playCount) {
        return utils.reNum(playCount)
      }
    },
    watch: {
      //=>延迟初始化better-scroll，以保证功能的正常使用
      song() {
        this.$nextTick(() => {
          this.initScroll('.wrapper-song')
        })
      },
      songList() {
        this.$nextTick(() => {
          this.initScroll('.wrapper-songList')
        })
      },
      djprogram() {
        this.$nextTick(() => {
          this.initScroll('.wrapper-djprogram')
        })
      }
    },
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