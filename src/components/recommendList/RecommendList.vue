<template>
  <div class="recommend-list">
    <div class="title">
      <span>推荐歌单</span>
    </div>
    <ul>
      <li v-for="item in songList">
        <figure>
          <img :src="item.picUrl" alt="">
          <figcaption>{{item.name}}</figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "RecommendList",
    props: {
      songList: {
        type: Array,
      }
    }
  }
</script>

<style scoped lang="less">
  .recommend-list {
    width: 100%;
    height: 100%;
    overflow: hidden;

    ul {
      display: flex;
      flex-wrap: nowrap;
      color: #666666;
      width: 100%;
      height: 100%;

      li {
        width: 100px;
        height: 100%;
        margin-left: 8px;
        flex-shrink: 0;

        figure {
          width: 100px;
          height: 100%;
          margin: 0;

          figcaption {
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*display: -webkit-box; !* autoprefixer: off *!*/
            /*-webkit-box-orient: vertical; !* autoprefixer: on *!*/
            /*-webkit-line-clamp: 2;*/
          }
        }
      }
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      width: 100%;
      height: 60px;
      line-height: 68px;
      text-indent: 1em;
    }
  }
</style>