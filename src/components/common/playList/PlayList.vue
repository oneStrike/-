<template>
  <div class="list-container">
    <div class="title">
      <i class="iconfont icon-bofang"></i>
      <span>播放全部</span>
      <span class="count">（共{{(lately||singerHitSongs||cloud).length}}首）</span>
    </div>
    <div class="wrapper lately-wrapper" v-if="name==='lately'&&lately">
      <List :listContent="lately"></List>
    </div>
    <div class="wrapper mini-wrapper clearboth" v-if="name==='mini'&&singerHitSongs">
      <List :listContent="singerHitSongs"></List>
    </div>
    <div class="wrapper cloud-wrapper" v-if="name==='cloud'&&cloud">
      <List :listContent="cloud"></List>
    </div>
  </div>
</template>

<script>
  import List from "./list/List";
  import BScroll from 'better-scroll'

  export default {
    name: "PlayList",
    data() {
      return {
        latelyScroll: null,
        miniScroll: null,
        cloudScroll: null,
      }
    },
    props: {
      lately: {
        type: Array,
        required: false,
      },
      singerHitSongs: {
        type: Array,
        required: false,
      },
      cloud: {
        type: Array,
        required: false,
      },
      name: {
        type: String,
        required: true,
      }
    },
    watch: {
      lately() {
        this.$nextTick(() => {
          if (this.latelyScroll) {
            this.latelyScroll.refresh();
            return;
          }
          this.latelyScroll = new BScroll('.lately-wrapper', {
            click: true,
            tap: true,
            scrollY: true,
          })
        })
      },


      singerHitSongs(value) {
        this.$nextTick(() => {
          setTimeout(() => {
            if (Object.keys(value) == 0) return;
            console.log(value)
            if (this.miniScroll) {
              this.miniScroll.refresh();
              console.log('重新计算高度')
              return;
            }
            this.miniScroll = new BScroll('.mini-wrapper', {
              click: true,
              tap: true,
              scrollY: true,
            })
            console.log('初始化')
          })
        })
      },


      cloud() {
        this.$nextTick(() => {
          if (this.cloudScroll) {
            this.cloudScroll.refresh();
            return;
          }
          this.cloudScroll = new BScroll('.cloud-wrapper', {
            click: true,
          })
        })
      }
    },
    components: {
      List,
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .list-container {
    width: 100%;
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

    .wrapper {
      width: 100%;
      overflow: hidden;
      position: relative;
      top: 0;
      left: 0;
    }

    .mini-wrapper {
      height: 340px;
    }
  }
</style>