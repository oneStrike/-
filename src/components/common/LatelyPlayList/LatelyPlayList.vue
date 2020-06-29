<template>
  <!-- @touchmove.prevent 阻止底层内容仍然可以滚动-->
  <aside @click="hide" @touchmove.prevent class="lately-container">
    <div ref="title" class="lately-content">
      <header class="title">
        <HeaderNav>
          <!-- 点击空白处隐藏-->
          <div class="left" @click="$emit('hide-lately-play')">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="center" :class="{'active':active}" @click="active=true">
            <h3>播放列表</h3>
          </div>
          <div class="right" :class="{'active':!active}" @click="active=false">
            <h3>云端历史</h3>
          </div>
        </HeaderNav>
      </header>
      <section v-show="active" class="lately-list">
        <PlayList name="lately" :lately="latelyList"></PlayList>
      </section>
      <section v-show="!active" class="lately-list">
        <PlayList name="cloud" :cloud="[]"></PlayList>
      </section>
    </div>
  </aside>
</template>

<script>
  import {mapState} from "vuex";
  import HeaderNav from "../headerNav/HeaderNav";
  import PlayList from "../playList/PlayList";

  export default {
    name: "LatelyPlayList",
    data() {
      return {
        active: true
      };
    },
    props: {
      initPosition: Boolean
    },
    computed: {
      ...mapState({
        latelyList: state => state.playPage.latelyList,
        playData: state => state.playPage.playData,
        isPlay: state => state.playPage.isPlay
      })
    },
    methods: {
      hide(e) {
        if (e.clientX > this.$refs.title.offsetWidth) {
          this.$emit('hide-lately-play')
        }
      }
    },
    components: {
      HeaderNav,
      PlayList
    }
  };
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .lately-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.2);

    .lately-content {
      width: 70%;
      height: 100%;
      background: #fff;

      .title {
        width: 100%;
        height: 45px;
        background: @themecolor;

        .center,
        .right {
          flex: 3;
          text-align: center;
          line-height: 45px;
          position: relative;
          color: @fontcolor;
        }

        .left {
          flex: 1;
          text-align: center;
          line-height: 45px;
          color: @fontcolor;
        }

        .active::after {
          content: "";
          border-bottom: 2px solid @fontcolor;
          width: 60px;
          position: absolute;
          left: 50%;
          margin-left: -30px;
          bottom: 5px;
        }
      }
    }

    .lately-list {
      width: 100%;
      height: 95%;
      color: #323030;
    }
  }
</style>