<template>
  <div id="singer">
    <header class="title">
      <span calss="singer-back" @click="$router.go(-1)">
          <i class="iconfont icon-fanhui"></i>
        </span>
      <h2>热门歌手分类</h2>
      <span @click="$router.replace({path:'/search'})">
             <i class="iconfont icon-sousuosearch82 right"></i>
        </span>
    </header>
    <nav class="singer-classify">
      <ul class="singer-area">
        <li @click="required.area=-1" :class="{'active':required.area===-1}">全部</li>
        <li @click="required.area=7" :class="{'active':required.area===7}">华语</li>
        <li @click="required.area=8" :class="{'active':required.area===8}">日本</li>
        <li @click="required.area=16" :class="{'active':required.area===16}">韩国</li>
        <li @click="required.area=96" :class="{'active':required.area===96}">欧美</li>
      </ul>
      <ul class="singer-type">
        <li @click="required.type=-1" :class="{'active':required.type===-1}">全部</li>
        <li @click="required.type=1" :class="{'active':required.type===1}">男歌手</li>
        <li @click="required.type=2" :class="{'active':required.type===2}">女歌手</li>
      </ul>
    </nav>
    <section ref="singers" class="singer-content">
      <Scroll :data="allSinger.all"
              :click="true"
              :scroll-y="true"
              :bounce="true"
              :pullUpload="true"
              @scrollToEnd="pullUpload"
              :roll="true"
              :probe-type="1"
              @roll="scrollEvent"
      >
        <List @trigger-click="skipDetail" :cover="true" :del="false" :list-content="allSinger"></List>
      </Scroll>
    </section>
    <div class="loading" ref="load">
      <img src="@/assets/images/loading2.gif" alt="">
      <span>正在加载中</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingers} from "../../api";
  import Scroll from "../../components/common/scroll/Scroll";
  import List from "../../components/common/list/List";

  export default {
    name: "Singer",
    data() {
      return {
        required: {type: -1, area: -1},
        offset: 1,
        pos: 0,
        allSinger: [],
      }
    },
    methods: {
      async getSinger(offset = 1) {
        try {
          this.allSinger = this.allSinger.concat((await getSingers(this.required.type, this.required.area, offset)).artists);
        } catch (e) {
          alert(e)
        }
      },
      pullUpload(scroll) {
        this.$refs.singers.ontouchend = () => {
          if (this.pos.y <= scroll.maxScrollY - 70) {
            this.getSinger(++this.offset)
            scroll.finishPullUp()
          }
        }
      },
      skipDetail(data) {
        this.$router.push({path: `/singer/singerDetail/${data.id}?name=${data.name}&cover=${data.picUrl}`})
      },
      scrollEvent(pos, scroll) {
        this.pos = pos;
        if (pos.y <= scroll.maxScrollY - 10) {
          let local = (pos.y - scroll.maxScrollY)
          this.$refs.load.style.transform = `translateY(${local - -50}px)`;
        } else {
          this.$refs.load.style.transform = 'translateY(50px)';
        }
      }
    },
    mounted() {
      this.getSinger()
    },
    watch: {
      required: {
        handler: function () {
          this.offset = 1;
          this.allSinger = [];
          this.getSinger()
        },
        deep: true
      }
    },
    components: {
      Scroll,
      List,
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #singer {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    color: #444141;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 45px;
      background: @themecolor;
      line-height: 45px;
      text-align: center;
      color: #fff;

      span {
        width: 45px;
        height: 45px;
        float: left;

        .iconfont {
          font-size: 30px;
          vertical-align: middle;
        }
      }

      span:nth-of-type(2) {
        float: right;
      }

      h2 {
        float: left;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .singer-classify {
      width: 100%;
      height: 100px;
      text-align: center;
      background: #fff;

      ul {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        padding-top: 12px;

        li {
          width: 45px;
          height: 25px;
          line-height: 25px;
          float: left;
          margin: 0 10px;
          border-radius: 12px;
          background: #dfdcdc;
        }

        & .active {
          color: #fff;
          background: @themecolor
        }
      }
    }

    .singer-content {
      height: 0;
      flex: 1;
    }

    .loading {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      position: fixed;
      bottom: 0;
      transform: translateY(50px);
    }
  }
</style>