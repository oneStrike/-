<template>
  <section class="detail-content">
    <h3>热歌风向标</h3>
    <div class="wrapper">
      <div class="content">
        <ul v-for="(item,index) in topListDetail">
          <li class="toplist-name">
            <h4>{{item.name}}</h4>
          </li>
          <li class="see-more"><span>查看更多</span></li>
          <li v-for="(content,index) in item.tracks">
            <span>{{index+1}}</span>
            <h5>{{content.first}}</h5>
            <span>{{content.second}}</span>
          </li>
        </ul>
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
  @import "../../assets/less/mixins";

  .detail-content {
    width: 100%;
    height: 180px;
    color: #666666;
    overflow: hidden;
    position: absolute;

    h3 {
      font-size: 16px;
      font-weight: bold;
      color: @themecolor;
      text-indent: 1em;
      margin-bottom: 20px;
    }

    .content {
      display: flex;
      float: left;

      ul {
        width: 222px;
        text-indent: 1em;
        background: orangered;
        position: relative;
        padding-top: 5px;

        .toplist-name {
          h4 {
            font-size: 14px;
            font-weight: bold;
            position: absolute;
          }
        }

        .see-more {
          position: absolute;
          right: 5px;
        }
      }
    }
  }
</style>