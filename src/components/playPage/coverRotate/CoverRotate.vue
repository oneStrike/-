<template>
  <div :class="{'rotate-start':rotateAndTimer}" class="cover-content" :style="{borderWidth:border}">
    <img :src="coverURL" alt="">
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "CoverRotate",
    props: {
      coverURL: {
        type: String,
        required: true
      },
      border: {
        type: String,
      },
    },
    computed: {
      ...mapState({
        rotateAndTimer: state => state.playPage.rotateAndTimer
      })
    }
  }
</script>

<style scoped lang="less">
  .cover-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 15px solid rgba(136, 130, 130, 0.3);
    border-radius: 240px;
    overflow: hidden;
  }

  .rotate-start {
    animation: rotate 20s 0s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>