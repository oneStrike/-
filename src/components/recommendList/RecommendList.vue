<template>
  <div class="recommend-list">
    <div class="title">
      <h3>{{title}}</h3>
    </div>
    <!--    歌曲列表-->
    <div v-if="song" class="wrapper-song">
      <ul class="content">
        <li v-for="(item,index) in song" :key="item.id">
          <figure>
            <!--          lazyload实现图片懒加载-->
            <img v-lazy="item.picUrl" :alt="item.copywriter"/>
            <figcaption>{{item.name}}</figcaption>
            <span>{{item.song.artists[0].name}}</span>
          </figure>
        </li>
      </ul>
    </div>
    <!--    歌单列表-->
    <div v-if="songList" class="wrapper-songList">
      <ul class="content">
        <li v-for="(item,index) in songList" :key="item.id">
          <figure>
            <div class="play-count">
              <i class="iconfont icon-erji"></i>
              <span>{{item.playCount|rePlayCount(that)}}</span>
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
        <li v-for="(item,index) in djprogram" :key="item.id">
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

  export default {
    name: "RecommendList",
    data() {
      return {
        that: this,
      }
    },
    props: {
      //=>展示的数据
      song: {
        type: Array
      },
      songList: {
        type: Array
      },
      djprogram: {
        type: Array,
      },
      //=>功能title
      title: {
        type: String,
        required: true
      },
      //=>是否展示歌手
      singer: {
        type: Boolean,
        default: false,
      },
      //=>是否展示播放次数
      playCount: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      reCount(num) {
        num += '';
        if (num.length < 5) return;
        if (num.length < 9) {
          return Number(num.slice(0, -4)) + '万'
        } else if (num.length >= 9) {
          let reNum = num.slice(0, -7);
          reNum = reNum.slice(0, -1) + '.' + reNum.slice(-1);
          return Number(reNum) + '亿'
        }
      },
      initScroll(container) {
        new BScroll(container, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      }
    },
    filters: {
      rePlayCount(playCount, that) {
        //=>that > 过滤器无法获取this，需要缓存
        switch ((playCount + '').length) {
          case 5:
            return that.reCount(playCount)
          case 6:
            return that.reCount(playCount)
          case 7:
            return that.reCount(playCount)
          case 8:
            return that.reCount(playCount)
          default:
            return that.reCount(playCount)
        }
      }
    },
    watch: {
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
  @import "./src/assets/less/mixins";

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