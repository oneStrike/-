<template>
  <div id="history-play">
    <header class="history-header">
      <span class="back" @click="$router.back()">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <h2 class="title">听歌排行</h2>
      <nav class="history-nav">
        <button @click="active='week';recordData(1)" :class="{'active':active==='week'}" class="week">最近一周</button>
        <button @click="active='all';recordData(0)" :class="{'active':active==='all'}" class="all">所有时间</button>
      </nav>
    </header>
    <section class="history-content">
      <div class="week-content">
        <HistoryDetail v-show="active==='week'" :data="weekRecord"></HistoryDetail>
      </div>
      <div class="all-content">
        <HistoryDetail v-show="active==='all'" :data="allRecord"></HistoryDetail>
      </div>
    </section>
  </div>
</template>

<script>
  import {getRecord} from "../../../api";
  import HistoryDetail from "../historyDetail/HistoryDetail";

  export default {
    name: "HistoryPlay",
    data() {
      return {
        active: 'week',
        weekRecord: null,
        allRecord: null,
      }
    },
    props: ['id'],
    methods: {
      async recordData(type) {
        if (this.weekRecord && this.allRecord) return;
        try {
          if (type === 0) {
            this.allRecord = (await getRecord(this.id, type)).allData;
          } else {
            this.weekRecord = (await getRecord(this.id, type)).weekData;
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
    mounted() {
      if (this.weekRecord) return;
      this.recordData(1)
    },
    components: {
      HistoryDetail
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #history-play {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: #fff;
    overflow: auto;

    .history-header {
      width: 100%;
      height: 100px;
      padding-top: 10px;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      background: #fff;
      z-index: 1;

      .back {
        float: left;
        margin: 0 10px;

        .iconfont {
          font-size: 26px;
        }
      }

      .title {
        float: left;
        font-size: 16px;
      }

      .history-nav {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        text-align: center;
        .bottom-border-1px(#ccc);
        position: absolute;
        bottom: 0;

        button {
          width: 50%;
          height: 35px;
          background: none;
          display: inline-block;
          font-size: 14px;
          text-align: center;
          position: relative;
        }

        .active {
          color: @themecolor;
        }

        .active::after {
          content: "";
          border-bottom: 2px solid @themecolor;
          width: 60px;
          position: absolute;
          left: 50%;
          margin-left: -30px;
          bottom: 0;
        }
      }
    }

    .history-content {
      margin-top: 100px;
    }
  }
</style>