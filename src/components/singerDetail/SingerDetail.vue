<template>
  <div id="singer-detail">
    <ShowDetail @trigger-back="$router.go(-1)" :data="reSingerSongs" :title="$route.query.name"
                :cover="$route.query.cover" :loading="loading"></ShowDetail>
  </div>
</template>

<script>
  import ShowDetail from "../common/showDetail/ShowDetail";
  import {utils} from "../../utils/utils";
  import {getSingerHitSongs} from "../../api";

  export default {
    name: "SingerDetail",
    data() {
      return {
        singerSongs: [],
        loading: true,
      }
    },
    props: ['id'],
    computed: {
      reSingerSongs() {
        if (!this.singerSongs) return;
        return utils.reData(this.singerSongs, 'song')
      },
    },
    methods: {
      async getSingerSongs() {
        this.singerSongs = (await getSingerHitSongs(this.id)).songs;
        this.loading = false;
      },
    },
    mounted() {
      this.getSingerSongs()
    },
    watch: {
      $route: {
        handler: function (n) {
          if (n.meta.name === 'singer') {
            this.loading = true;
            this.getSingerSongs()
          }
        }
      }
    },
    components: {
      ShowDetail,
    }
  }
</script>

<style scoped lang="less">
  #singer-detail {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
  }
</style>