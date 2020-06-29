<template>
  <ul id="mv-content">
    <li @click="skipVideo(mv.id)" v-for="mv in mvData" :key="mv.id">
      <figure>
        <img v-lazy="mv.cover" :key="mv.cover" alt="">
        <figcaption>{{mv.name}}</figcaption>
      </figure>
      <span class="mv-artistName">{{mv.artistName}}</span>
    </li>
  </ul>
</template>

<script>

  export default {
    name: "TopMV",
    props: {
      mvData: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      skipVideo(id) {
        // this.$router.push({path: '/recommend/video/', query: {id: id}})
        this.$router.push({path: `/recommend/video/${id}`})
        //=>分发一个事件实现页面刷新
        // this.$emit('reload', id)
        console.log(2)
        console.log(id)
      }
    },
    // =>无法触发
    beforeRouteUpdate(to, from, next) {
      console.log('2')
      next();
    }
  }
</script>

<style scoped lang="less">

  #mv-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      width: 150px;
      height: 120px;
      margin: 5px 0;
      float: left;
      color: #323030;
      text-align: center;

      figure {
        padding: 0;
        margin: 0;

        img[lazy="loading"] {
          width: 70%;
          height: 60%;
        }

        figcaption {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>