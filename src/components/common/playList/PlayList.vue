<template>
  <div class="list-container">
    <div class="title">
      <i class="iconfont icon-bofang"></i>
      <span>播放全部</span>
      <span class="count">（共{{(lately||cloud).length}}首）</span>
    </div>
    <div ref="lately" class="list-wrapper" v-if="name==='lately'&&lately">
      <Scroll :scrollY="true" :data="lately">
        <List @trigger-click="playSong" :listContent="lately"></List>
      </Scroll>
    </div>
    <div ref="cloud" class="list-wrapper" v-if="name==='cloud'&&cloud">
      <Scroll :scrollY="true" :data="cloud">
        <List @trigger-click="playSong" :listContent="cloud"></List>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import List from "./list/List";
  import Scroll from "../scroll/Scroll";

  export default {
    name: "PlayList",
    props: {
      lately: {
        type: Array,
        default: () => {
          return [];
        }
      },
      cloud: {
        type: Array,
        default: () => [],
      },
      name: {
        type: String,
        required: true,
      }
    },
    methods: {
      playSong(song) {
        this.$store.commit("setPlayStatus", {
          data: song,
          play: true,
          effect: true,
        });
      }
    },
    components: {
      List,
      Scroll
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .list-container {
    width: 100%;
    height: 100%;
    font-size: 16px;

    .title {
      width: 100%;
      height: 45px;
      font-size: 14px;
      line-height: 45px;
      color: @fontcolor;
      background: @themecolor;

      .iconfont {
        font-size: 20px;
        vertical-align: middle;
        margin: 0 15px;
      }

      .count {
        font-size: 12px;
      }
    }

    .list-wrapper {
      width: 100%;
      height: 94%;
      overflow: hidden;
      position: relative;
      top: 0;
      left: 0;
    }
  }
</style>