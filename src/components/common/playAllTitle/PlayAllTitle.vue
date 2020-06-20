<template>
  <div class="play-all">
    <i class="iconfont icon-bofang"></i>
    <div class="title">
      <span>播放全部</span>
      <span class="song-amount">（共{{amount}}首）</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayAllTitle",
    props: {
      amount: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .play-all {
    width: 100%;
    height: 45px;
    color: #323030;
    line-height: 45px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    .bottom-border-1px(#e4e4e4);
    background: #f2f3f4;

    .iconfont {
      font-size: 24px;
      vertical-align: middle;
    }
  }

  .title {
    height: 45px;
    display: inline-block;
    margin-left: 10px;

    .song-amount {
      font-size: 12px;
      color: #998b8b;
    }
  }
</style>