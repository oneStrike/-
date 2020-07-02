<template>
  <div id="search-result">
    <nav class="result-nav">
      <ul>
        <li @click="searchMore(1)" :class="{'active':searchType===1}">单曲</li>
        <li @click="searchMore(100)" :class="{'active':searchType===100}">歌手</li>
        <li @click="searchMore(1004)" :class="{'active':searchType===1004}">mv</li>
        <li @click="searchMore(1000)" :class="{'active':searchType===1000}">歌单</li>
      </ul>
    </nav>
    <div v-show="loading" class="loading">
      <img src="@/assets/images/loading2.gif" alt="">
    </div>
    <section v-show="!loading" class="show-search">
      <list :cover="true" @trigger-click="playResult" :del="false" :list-content="searchResult"></list>
    </section>
  </div>
</template>

<script>
  import {getSearch, getSongDetail} from "../../../api";
  import List from "../../common/list/List";

  export default {
    name: "SearchResult",
    data() {
      return {
        searchType: 1,
        searchResult: [],
        singleResult: [],
        singerResult: [],
        mvResult: [],
        songListResult: [],
        lastRequest: {key: '', type: '', offset: ''},
        cover: '',
        loading: true,
      }
    },
    computed: {},
    props: ['keywords'],
    methods: {
      //=>offset 预留上拉加载更多功能
      async sendSearch(type, offset) {
        //=>避免重复发送请求
        if (
          this.lastKey === this.keywords &&
          this.lastType === type &&
          offset === this.lastOffset
        ) return;
        this.searchResult = [];
        try {
          switch (type) {
            case 1:
              this.singleResult = (await getSearch(this.keywords, type)).result
              break;
            case 100:
              this.singerResult = (await getSearch(this.keywords, type)).result
              break;
            case 1004:
              this.mvResult = (await getSearch(this.keywords, type)).result
              break;
            case 1000:
              this.songListResult = (await getSearch(this.keywords, type)).result
          }
          this.loading = false;
        } catch (e) {
          alert(e);
        }
        this.lastKey = this.keywords;
        this.lastType = type;
        this.lastOffset = offset;
      },
      searchMore(type) {
        this.searchType = type;
        this.sendSearch(type);
      },
      async getCover(id) {
        try {
          return (await getSongDetail(id)).songs[0].al.picUrl;
        } catch (e) {
          alert('歌曲封面获取失败')
        }
      },
      playResult(data) {
        if (data.type === 'song') {
          //=>歌曲需要额外获取封面
          this.getCover(data.id).then(value => {
            data.cover = value;
            //=>播放歌曲
            this.$store.commit('setPlayStatus', {
              data: data,
              effect: true,
              showPlayPage: true,
              dynamic: 'playPage',
              play: true,
              lately: data,
              latelySongID: data.id,
            })
          });
          //=>查看歌单详情
        } else if (data.type === 'songList') {
          this.$router.push({
            path: `/home/songList/${data.id}`
          })
          //=>播放mv
        } else if (data.type === 'mv') {
          this.$router.push({
            path: `/home/video/${data.id}`
          })
          //=>查看歌手
        } else if (data.type === 'singer') {
          this.$router.push({path: `/singer/singerDetail/${data.id}?name=${data.name}&cover=${data.cover}`})
        }
      },
    },
    watch: {
      keywords: {
        handler: function () {
          this.searchType = 1;
          this.sendSearch(1);
          this.loading = true;
        },
      },
      singleResult: {
        handler: function (value) {
          if (typeof value.songs === 'undefined') return;
          value.songs.forEach((item) => {
            this.searchResult.push({
              name: item.name,
              id: item.id,
              singer: item.artists[0].name,
              singerID: item.artists[0].id,
              time: item.duration,
              type: 'song'
            })
          })
        }
      },
      singerResult: {
        handler: function (value) {
          if (typeof value.artists === 'undefined') return;
          value.artists.forEach((item) => {
            this.searchResult.push({
              name: item.name,
              id: item.id,
              cover: item.picUrl,
              type: 'singer',
            })
          })
        },
      },
      mvResult: {
        handler: function (value) {
          if (typeof value.mvs === 'undefined') return;
          value.mvs.forEach((item) => {
            this.searchResult.push({
              name: item.name,
              id: item.id,
              cover: item.cover,
              singer: item.artistName,
              singerID: item.artistID,
              des: item.briefDesc,
              type: 'mv'
            })
          })
        }
      },
      songListResult: {
        handler: function (value) {
          if (typeof value.playlists === 'undefined') return;
          value.playlists.forEach((item) => {
            this.searchResult.push({
              name: item.name,
              id: item.id,
              singer: item.description,
              cover: item.coverImgUrl,
              type: 'songList'
            })
          })
        }
      }
    },
    mounted() {
      this.sendSearch(1);
      this.searchType = 1;
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
    height: 88%;
    position: fixed;
    top: 80px;
    z-index: 10;
    background: #ffffff;
    font-size: 16px;
    color: #323030;
    overflow: scroll;
    padding-bottom: 30px;
    text-align: center;

    .result-nav {
      width: 100%;
      height: 40px;

      ul {
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 40px;
        background: #fff;
        position: fixed;
        top: 80px;
        z-index: 10;
      }
    }
  }

  .active {
    color: @themecolor;
    border-bottom: 2px solid @themecolor;
  }
</style>