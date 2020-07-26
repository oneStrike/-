<template>
  <div id="recommend">
    <header class="recommend-head">
      <div class="back" @click="$router.back()">
        <i class="iconfont icon-fanhui"></i>
        <h2>每日推荐</h2>
      </div>
      <div class="recommend-date">
        <span>{{date.month}}/</span>
        <span>{{date.day}}</span>
      </div>
    </header>
    <section class="recommend-content">
      <List @trigger-click="playRecommend" :list-content="recommend" :del="false"></List>
    </section>
  </div>
</template>

<script>
  import {getRecommend} from "../../../api";
  import {utils} from "../../../utils/utils";
  import List from "../../common/list/List";

  export default {
    name: "Recommend",
    data() {
      return {
        date: {
          month: (new Date().getMonth() + 1 + '').padStart(2, '0'),
          day: (new Date().getDate() + '').padStart(2, '0'),
        },
        recommend: []
      }
    },
    methods: {
      playRecommend(song) {
        this.$store.commit('setPlayStatus', {
          data: song,
          effect: true,
          dynamic: 'playPage',
          showPlayPage: true
        })
      }
    },
    async mounted() {
      try {
        this.recommend = utils.reData((await getRecommend()).data.dailySongs, 'song')
      } catch (e) {
        console.log(e)
      }
    },
    components: {
      List,
    }
  }
</script>

<style scoped lang="less">
  #recommend {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    overflow: auto;

    .recommend-head {
      width: 100%;
      height: 230px;
      position: fixed;
      top: 0;
      left: 0;
      background: url("../../../assets/images/default4.png") no-repeat;
      background-size: cover;

      .back {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0 0 10px;

        .iconfont {
          float: left;
          font-size: 26px;
        }

        h2 {
          font-weight: bold;
          margin-left: 50px;
        }
      }

      .recommend-date {
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 10px;

        span:nth-of-type(1) {
          font-size: 32px;
        }

        span:nth-of-type(2) {
          font-size: 22px;
        }
      }
    }

    .recommend-content {
      width: 100%;
      border-radius: 20px 20px 0 0;
      background: #fff;
      position: absolute;
      top: 200px;
      /*z-index: 11;*/
      overflow: hidden;
    }
  }
</style>