<template>
  <section class="detail-content clearboth">
    <h3>热歌风向标</h3>
    <div class="wrapper">
      <div class="content">
        <div v-for="item in topListDetail" :key="item.id">
          <div class="toplist-name">
            <h4>{{item.name}}</h4>
            <span>查看更多</span>
          </div>
          <ul class="detail-list">
            <li v-for="(content,index) in item.tracks" :key="index">
              <img :src="item.coverImgUrl" alt="">
              <div>
                <span class="detail-rank">{{index+1}}</span>
                <h5>{{content.first}}</h5>
                <span class="detail-second"> - {{content.second}}</span>
                <span class="play-btn"> <i class="iconfont icon-bofang"></i></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "topListDetail",
    props: {
      topListDetail: {
        type: Array,
        required: true,
      }
    },
    watch: {
      topListDetail() {
        this.$nextTick(() => {
          new BScroll('.wrapper', {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  .detail-content {
    height: 100%;
    color: #666666;
    position: relative;
    margin-left: 10px;

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
      position: absolute;

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
          width: 240px;
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
              width: 170px;
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
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
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

                .iconfont {
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>