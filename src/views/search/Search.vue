<template>
  <div ref="search" id="search">
    <!--    头部输入框-->
    <header class="search-box">
     <span @click="hide" class="back">
        <i class="iconfont icon-fanhui"></i>
     </span>
      <label for="">
        <input @click="suggestShow=true" class="input-content" v-model="searchContent"
               :placeholder="'大家都在搜：' +defaultSearch" type="text">
      </label>
      <span class="singer">
        <i class="iconfont icon-icon32"></i>
      </span>
    </header>
    <!--    历史搜索记录-->
    <section class="lately-search">
      <h2 class="lately-title">历史记录：</h2>
      <span class="lately-delete" @click="latelySearch=[]">
        <i class="iconfont icon-lajixiang "></i>
      </span>
      <Scroll :data="latelySearch" :scrollX="true" :click="true" :bounce="true">
        <ul class="lately-container">
          <li v-for="(content,index) in latelySearch" :key="index" class="lately-content">
            {{content}}
          </li>
        </ul>
      </Scroll>
    </section>
    <!--    搜索建议-->
    <section v-show="searchContent&&suggestShow" class="suggest">
      <span @click="showSearchResult" class="user-input">搜索 "{{searchContent}}"</span>
      <ul class="suggest-content">
        <li @click="showSearchResult" v-for="(suggest,index) in suggest.allMatch" :key="index">
          <i class="iconfont icon-sousuosearch82"></i>
          <span>{{suggest.keyword}}</span>
        </li>
      </ul>
    </section>
    <!--    热门搜索-->
    <section @touchstart="suggestShow=false" class="top-search">
      <h2>热门搜索</h2>
      <List @trigger-click="startSearch" :listContent="topSearch"></List>
    </section>
    <!--    搜索结果展示-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {
    getSearchSuggest,
    getDefaultSearchKeyWords,
    getTopSearchList
  } from "../../api";
  import List from "@common/playList/list/List";
  import Scroll from "@common/scroll/Scroll";

  export default {
    name: "Search",
    data() {
      return {
        defaultSearch: '',
        searchContent: '',
        latelySearch: [],
        suggest: [],
        topSearch: [],
        suggestShow: true,
      }
    },
    methods: {
      hide() {
        this.searchContent = '';
        this.$router.go(-1)
      },
      showSearchResult() {
        if (this.latelySearch.indexOf(this.searchContent) === -1) {
          this.latelySearch.push(this.searchContent)
        }
      },
      async getDefault() {
        try {
          this.defaultSearch = (await getDefaultSearchKeyWords()).data.realkeyword;
        } catch (e) {
          this.defaultSearch = ''
        }
      },
      async getSuggest() {
        try {
          this.suggest = (await getSearchSuggest(this.searchContent)).result;
        } catch (e) {
          this.suggest = [];
        }
      },
      async getTopSearch() {
        try {
          let temp = (await getTopSearchList()).data;
          temp.forEach((item) => {
            this.topSearch.push({
              name: item.searchWord,
              singer: item.content,
              icon: item.iconUrl,
              score: item.score,
            })
          })
        } catch (e) {
          this.topSearch = [];
        }
      },
      startSearch(keyword) {
        this.$router.push({path: `/search/result/${keyword.name}`})
      },
    },
    mounted() {
      this.getDefault();
      this.getTopSearch()
    },
    watch: {
      searchContent: {
        handler: function (value) {
          value && this.getSuggest();
        }
      }
    },
    components: {
      Scroll,
      List
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #search {
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    overflow: scroll;
    z-index: 100;

    .search-box {
      width: 100%;
      height: 80px;
      font-size: 16px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: fixed;
      background: #fff;

      .input-content {
        border: none;
        outline: none;
        width: 240px;
        height: 40px;
        border-bottom: 1px solid @themecolor;
        font-size: 16px;
      }

      .back, .singer {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;

        .iconfont {
          color: @themecolor;
          font-size: 28px;
          vertical-align: middle;
        }
      }
    }

    .lately-search {
      width: 100%;
      height: 80px;
      padding: 0 20px;
      box-sizing: border-box;
      position: fixed;
      top: 80px;
      color: @themecolor;
      background: #fff;

      h2 {
        font-size: 14px;
        font-weight: bold;
      }

      .lately-title {
        display: inline-block;
        font-weight: bold;
      }

      .lately-delete {
        float: right;
      }

      .lately-container {
        font-size: 14px;
        float: left;
        margin-top: 20px;

        li {
          white-space: nowrap;
          font-size: 16px;
          display: inline;
          border-radius: 20px;
          background: #e5e5e5;
          padding: 4px 5px;
          margin: 0 10px;
          color: #323030;
        }
      }
    }

    .suggest {
      width: 260px;
      font-size: 16px;
      color: #323030;
      position: fixed;
      top: 100px;
      left: 50%;
      background: #ffffff;
      transform: translateX(-50%);
      box-shadow: 0 0 18px -2px #666;
      text-indent: 1em;

      .user-input {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: @themecolor;
        .bottom-border-1px(#666);
      }

      .suggest-content {
        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          .bottom-border-1px(#e2dbdb);

          .iconfont {
            font-size: 22px;
            margin-right: 10px;
          }
        }
      }
    }

    .top-search {
      width: 100%;
      height: 100%;
      position: relative;
      top: 180px;
      z-index: -1;

      h2 {
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        padding-left: 20px;
        color: @themecolor;
        position: fixed;
        top: 160px;
        background: #fff;
        z-index: 1;
      }
    }
  }
</style>