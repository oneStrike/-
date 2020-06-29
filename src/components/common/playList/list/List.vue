<template>
  <ul ref="slide" class="list-slide">
    <li @click="playLately(child)"
        v-for="(child,index) in listContent"
        :key="index"
        class="list-content">
      <span class="count">{{index+1}}</span>
      <div class="list-detail" :class="{'active-play':(child.id&&playData.id === child.id)}">
        <span class="name">
          {{child.name}}
        <img class="icon" v-if="child.icon" :src="child.icon" alt=""></span>
        <span class="singer">{{child.singer}}</span>
        <span class="score" v-if="child.score">{{child.score}}</span>
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
        isPlay: state => state.playPage.isPlay,
      })
    },
    props: {
      listContent: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      playLately(child) {
        //=>分发一个事件，供搜索页面使用
        this.$emit('trigger-click', child)
      },
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

      .list-detail {
        width: 80%;
        height: 60px;
        text-align: left;
        float: right;
        color: #323030;
        line-height: 60px;
        position: relative;

        span {
          display: block;
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .icon {
          display: inline-block;
          height: 13px;
        }

        .score {
          float: right;
          padding-right: 10px;
          position: absolute;
          top: 50%;
          margin-top: -15px;
          right: 10px;
        }
      }
    }
  }

  .active-play {
    color: @themecolor !important;
  }

</style>