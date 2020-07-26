<template>
  <div class="history-detail">
    <ul>
      <li :class="{'active':history.song.id===playData.id}" @click="playHistory(history)"
          v-for="(history,index) in data" :key="history.song.id">
        <span>{{index+1}}</span>
        <div class="mess">
          <span>{{history.song.name}}</span>
          <span>{{history.song.ar[0].name}}</span>
        </div>
        <span>{{history.playCount}}次</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {utils} from "../../../utils/utils";

  export default {
    name: "HistoryDetail",
    data() {
      return {
        playData: {},
      }
    },
    props: {
      data: {
        type: Array,
        default: null,
      },
    },
    methods: {
      playHistory(song) {
        this.playData = utils.reData(song, 'song');
        this.$store.commit('setPlayStatus', {
          data: this.playData,
          effect: true,
          showPlayPage: true,
          dynamic: 'playPage',
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .history-detail {
    ul {
      li {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        .bottom-border-1px(#ccc);
        font-size: 16px;
        font-weight: bold;

        span:nth-child(1) {
          flex: 1;
        }

        .mess {
          flex: 6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          font-weight: normal;

          span {
            display: block;
          }
        }

        span:nth-child(3) {
          flex: 1;
        }
      }

      & .active {
        color: @themecolor;
      }
    }
  }
</style>