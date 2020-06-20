<template>
  <div class="list-container">
    <ul class="list-content">
      <li v-for="(song,index) in content" :key="song.id" class="content-detail">
        <span class="count">{{index+1}}</span>
        <span class="name">{{song.name}}</span>
        <span class="singer">{{song.singer}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ListOfDetail",
    props: {
      content: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .list-container {
    width: 100%;
    height: 100%;

    .list-content {
      width: 100%;
      height: 100%;
      background: #f2f3f4;
      font-size: 14px;
      text-align: center;

      .content-detail {
        height: 45px;
        .bottom-border-1px(#e4e4e4)

        .count {
          width: 45px;
          height: 45px;
          float: left;
        }
      }
    }
  }
</style>