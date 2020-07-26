<template>
  <div @touchmove.prevent id="song-list-detail">
    <ShowDetail @trigger-back="$router.go(-1)" :cover="detail.coverImgUrl" :title="detail.name"
                :data="reSongList" :collect="detail.subscribedCount" @play-all="playAll"
                :loading="loading"></ShowDetail>
  </div>
</template>

<script>
  import {getSongListDetail} from "../../api";
  import {utils} from "../../utils/utils";
  import ShowDetail from "../../components/common/showDetail/ShowDetail";

  export default {
    name: "SongListDetail",
    data() {
      return {
        detail: {},
        lastID: '',
        loading: true,
      }
    },
    props: ['id'],
    methods: {
      async getDetail() {
        try {
          this.detail = (await getSongListDetail(this.id)).playlist;
          this.loading = false;
        } catch (e) {
          alert(e)
        }
      },
      playAll() {
        this.$store.commit('setSongListPlay', {
          songList: this.reSongList,
        })
        this.$store.commit('setPlayStatus', {
          data: this.reSongList[0],
          effect: true,
          play: true,
          showPlayPage: true,
          dynamic: 'playPage',
          mode: false,
        })
      }
    },
    computed: {
      reSongList() {
        if (!this.detail.tracks) return;
        return utils.reData(this.detail.tracks, 'song')
      },
    },
    mounted() {
      this.getDetail()
    },
    watch: {
      $route: {
        handler: function (n) {
          if (n.meta.name === 'songList' && this.lastID !== n.params.id) {
            this.loading = true;
            this.lastID = n.params.id;
            this.getDetail()
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
  @import "@less/mixins";

  #song-list-detail {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    background: #fff;
  }
</style>