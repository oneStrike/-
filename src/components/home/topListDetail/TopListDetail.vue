<template>
  <section class="detail-content">
    <h3>热歌风向标,没有找到对应的播放接口</h3>
    <div class="wrapper">
      <Scroll :data="topListDetail" :scrollX="true" :click="true">
        <div class="content">
          <div v-for="item in topListDetail" :key="item.id">
            <div class="toplist-name">
              <h4>{{item.name}}</h4>
            </div>
            <ul class="detail-list">
              <li v-for="(content,index) in item.tracks" :key="index">
                <img :src="item.coverImgUrl" alt="">
                <div>
                  <span class="detail-rank">{{index+1}}</span>
                  <h5>{{content.first}}</h5>
                  <span class="detail-second"> - {{content.second}}</span>
                  <span @click="playSong(item.tracks)" class="play-btn"> <i class="iconfont icon-bofang"></i></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
    <div v-if="$store.state.playPage.playData.id" class="empty"></div>
  </section>
</template>

<script>
  import Scroll from "../../common/scroll/Scroll";

  export default {
    name: "topListDetail",
    props: {
      topListDetail: {
        type: Array,
        required: true,
      }
    },
    components: {
      Scroll,
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .detail-content {
    width: 100%;
    height: 100%;
    color: #666666;
    position: relative;

    h3 {
      font-size: 16px;
      color: @themecolor;
      font-weight: bold;
      margin: 20px 0;
      text-indent: 1em;
    }

    .wrapper {
      width: 100%;
      height: 198px;
      overflow: hidden;

      .content {
        height: 100%;
        display: flex;
        float: left;

        .toplist-name {
          position: relative;
          padding-left: 5px;

          h4 {
            font-size: 12px;
            font-weight: bold;
          }

          span {
            position: absolute;
            right: 10px;
            top: 0;

          }
        }

        .detail-list {
          width: 280px;
          height: 180px;
          margin: 1px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          li {
            float: left;
            position: relative;

            img {
              height: 50px;
            }

            div {
              height: 100%;
              position: absolute;
              top: 0;
              width: 210px;
              left: 55px;
              padding-top: 10px;

              .detail-rank {
                display: inline-block;
                position: relative;
                top: 1px;
                font-size: 16px;
                font-weight: bold;
                padding: 0 5px;
                color: @themecolor;
              }

              h5 {
                width: 150px;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .detail-second {
                display: block;
                height: 17px;
                width: 110px;
                margin-left: 17px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .play-btn {
                position: absolute;
                right: 5px;
                top: 15px;
                color: @themecolor;
                text-align: center;
                line-height: 25px;
                vertical-align: middle;

                .iconfont {
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
    }

    .empty {
      width: 100%;
      height: 60px;
    }
  }
</style>