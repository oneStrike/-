<template>
  <div class="home-list">
    <div class="title">
      <h3>{{title}}</h3>
    </div>
    <!--    歌曲列表-->
    <div class="wrapper-song">
      <Scroll eventPassthrough="vertical" :data="listData" :bounce="true" :scrollX="true">
        <ul class="content">
          <li v-for="s in listData" :key="s.id" @click.stop="playCurrentSong(s)">
            <figure>
              <!--          lazyload实现图片懒加载-->
              <img v-lazy="s.picUrl" :key="s.picUrl" :alt="s.copywriter"/>
              <div v-if="count" class="play-count">
                <i class="iconfont icon-erji"></i>
                <span>{{s.playCount|rePlayCount}}</span>
              </div>
              <figcaption>{{s.name}}</figcaption>
              <span v-if="singer">{{s.song.artists[0].name||''}}</span>
            </figure>
          </li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from "../../common/scroll/Scroll";
  import {utils} from "@/utils/utils";
  import {mapState} from "vuex";

  export default {
    name: "HomeList",
    data() {
      return {
        timer: null,
      }
    },
    props: {
      listData: {
        type: Array,
        default: () => [],
      },
      singer: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        required: true
      },
      count: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      ...mapState({
        isPlay: state => state.playPage.isPlay,
        playData: state => state.playPage.playData,
      })
    },
    methods: {
      playCurrentSong(s) {
        //=>TODO 添加定时器是为了解决点击穿透，
        if (s.playCount) {
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.$router.push({
              path: `/home/songList/${s.id}`,
            })
          })
          return;
        }
        //=>点击的歌曲
        if (typeof this.playData.id === 'undefined') {
          this.$store.commit("setPlayStatus", {
            data: utils.reData(s, 'song'),
            showPlayPage: true,
            play: true,
            effect: true,
            dynamic: "playPage",
          });
        } else if (this.playData.id !== s.id) {
          this.$store.commit("setPlayStatus", {
            data: utils.reData(s, 'song'),
            showPlayPage: true,
            play: true,
            effect: true
          });
        } else {
          this.$store.commit("setPlayStatus", {
            showPlayPage: true,
          });
        }
      }
    },
    filters: {
      //=>格式化歌单的播放次数
      rePlayCount(playCount) {
        return utils.reNum(playCount);
      }
    },
    components: {
      Scroll,
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .home-list {
    width: 100%;
    height: 100%;
    overflow: hidden;

    ul {
      display: flex;
      flex-wrap: nowrap;
      color: #666666;
      min-width: 100%;
      float: left;
      height: 150px;

      li {
        width: 100px;
        margin-left: 8px;
        flex-shrink: 0;
        text-align: center;
        position: relative;

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
            color: @fontcolor;
            position: absolute;
            top: 0;
            right: 5px;

            span {
              display: inline-block;
              margin: 0 5px;
            }

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

    .wrapper-song {
      width: 100%;
      position: absolute;
      overflow: hidden;
    }
  }
</style>