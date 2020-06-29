<template>
  <div id="search-result">
    <nav class="result-nav">
      <ul>
        <li @click="searchMore(1)" :class="{'active':activeLine===1}">单曲</li>
        <li @click="searchMore(100)" :class="{'active':activeLine===100}">歌手</li>
        <li @click="searchMore(1006)" :class="{'active':activeLine===1006}">mv</li>
        <li @click="searchMore(1000)" :class="{'active':activeLine===1000}">歌单</li>
      </ul>
    </nav>
    <section class="show-search">
      <list></list>
    </section>
  </div>
</template>

<script>
  import {getSearch} from "../../api";
  import List from "../common/playList/list/List";

  export default {
    name: "SearchResult",
    data() {
      return {
        activeLine: 1,
        result: [],
      }
    },
    props: ['key'],
    methods: {
      async sendSearch(type) {
        this.result = (await getSearch(this.key, type))
      },
      searchMore(type) {
        this.activeLine = type;
        this.sendSearch(type)
      }
    },
    components: {
      List
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #search-result {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 80px;
    z-index: 10;
    background: #ffffff;
    font-size: 16px;
    color: #323030;

    .result-nav {
      width: 100%;
      height: 40px;

      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 40px;

        li {

        }
      }
    }
  }

  .active {
    color: @themecolor;
    border-bottom: 2px solid @themecolor;
  }
</style>