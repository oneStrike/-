<template>
  <!-- @touchmove.prevent 阻止底层内容仍然可以滚动-->
  <aside @touchmove.prevent class="lately-container">
    <div class="lately-content">
      <header class="title">
        <HeaderNav>
          <!--        //=>使用自定义事件通知父组件，隐藏历史播放页面-->
          <div class="left" @click="$emit('hide-lately-play')">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="center" :class="{'active':bottomBorder}" @click="bottomBorder=true">
            <h3>播放列表</h3>
          </div>
          <div class="right" :class="{'active':!bottomBorder}" @click="bottomBorder=false">
            <h3>最近播放</h3>
          </div>
        </HeaderNav>
        <PlayAllTitle :amount="latelyList.length"></PlayAllTitle>
      </header>
      <section class="lately-list">
        <ListOfDetail :content="latelyList"></ListOfDetail>
      </section>
    </div>
  </aside>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderNav from "../headerNav/HeaderNav";
  import PlayAllTitle from "../playAllTitle/PlayAllTitle";
  import ListOfDetail from "../listOfDetail/ListOfDetail"

  export default {
    name: "LatelyPlayList",
    data() {
      return {
        bottomBorder: true,
      }
    },
    props: {
      initPosition: Boolean,
    },
    computed: {
      ...mapState({
        latelyList: state => state.playPage.latelyList
      })
    },
    methods: {},
    components: {
      HeaderNav,
      PlayAllTitle,
      ListOfDetail
    }
  }
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
    background: rgba(0, 0, 0, .2);

    .lately-content {
      width: 70%;
      height: 100%;
      background: #fff;

      .title {
        width: 100%;
        height: 45px;
        background: @themecolor;


        .center, .right {
          flex: 3;
          text-align: center;
          line-height: 45px;
          position: relative;
          color: @fontcolor
        }

        .left {
          flex: 1;
          text-align: center;
          line-height: 45px;
          color: @fontcolor
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
      color: #323030;
      margin-top: 44px;
    }
  }
</style>