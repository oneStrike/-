<template>
  <ul ref="slide" class="list-slide">
    <li @click="playLately(song)"
        v-for="(song,index) in listContent"
        :key="song.id"
        class="list-content"
        :class="{'active-play':playData.id === song.id}">
      <span class="count">{{index+1}}</span>
      <div class="cantlet">
        <span class="name">{{song.name}}</span>
        <span class="singer">{{song.singer}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'List',
    computed: {
      ...mapState({
        playData: state => state.playPage.playData,
      })
    },
    props: {
      listContent: {
        type: Array,
        required: true,
      }
    },
    methods: {
      playLately(song) {
        //=>如果当前的歌曲正在播放，并且点击的歌曲与当前播放的歌曲为同一首，则直接返回，不做处理
        if (this.playData.id === song.id && this.isPlay) return;
        this.$store.commit("setPlayStatus", {
          data: song,
          play: true
        });
      }
    },
  }
</script>
<style scoped lang="less">
  @import "@less/mixins";

  .list-slide {
    width: 100%;
    background: #f2f3f4;
    font-size: 14px;
    text-align: center;

    .list-content {
      height: 60px;
      .bottom-border-1px(#b3aeae);

      .count {
        width: 20%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        float: left;
        font-size: 20px;
        color: #323030;
      }

      .cantlet {
        width: 80%;
        height: 40px;
        text-align: left;
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;

        .name {
          width: 150px;
          font-size: 16px;
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .singer {
          font-size: 12px;
          flex: 1;
          color: #857979;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    & .active-play {
      color: @themecolor;
    }
  }

</style>