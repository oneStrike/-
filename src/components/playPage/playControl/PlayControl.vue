<template>
  <div class="play-control" @click="playControl">
    <div class="play-mode">
      <i v-show="true" class="iconfont icon-shunxubofang"></i>
      <i v-show="false" class="iconfont icon-danquxunhuan"></i>
      <i v-show="false" class="iconfont icon-suiji"></i>
    </div>
    <div class="last-song">
      <i class="iconfont icon-shangyiqu"></i>
    </div>
    <div class="play-stop">
      <div class="play"></div>
      <i class="iconfont icon-zanting"></i>
    </div>
    <div class="next-song">
      <i class="iconfont icon-xiayiqu"></i>
    </div>
    <div class="collect">
      <i class="iconfont icon-aixin"></i>
    </div>
  </div>
</template>

<script>


  export default {
    name: "PlayControl",
    props: {
      playTag: HTMLAudioElement
    },
    methods: {
      playControl(e) {
        let target = e.target;
        if (target.className === 'play-mode' || target.parentElement.className === 'play-mode') {
          console.log(this.playTag)
          this.playTag.pause()
          this.$store.commit('setRotateAndTimer', false)
          this.$store.commit('setIsPlay', false)
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .play-control {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    line-height: 50px;

    .play-stop {
      .iconfont {
        font-size: 50px;
      }
    }

    .iconfont {
      width: 100%;
      height: 100%;
      display: inline-block;
      font-size: 30px;
    }
  }
</style>