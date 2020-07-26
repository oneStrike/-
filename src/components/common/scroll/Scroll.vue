<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    props: {
      //=>监视的数据
      data: {
        type: [Array, String],
        default: null,
      },
      //=>x轴滚动
      scrollX: {
        type: Boolean,
        default: false,
      },
      //=>垂直滚动
      scrollY: {
        type: Boolean,
        default: false,
      },
      //=>点击事件
      click: {
        type: Boolean,
        default: true,
      },
      //=>深度监视
      deep: {
        type: Boolean,
        default: false,
      },
      //=>回弹动画
      bounce: {
        type: Boolean,
        default: false,
      },
      //=>原生滚动
      eventPassthrough: {
        type: String,
        default: '',
      },
      //=>下拉刷新
      pullDownRefresh: {
        type: Boolean,
        default: false,
      },
      //=>上拉刷新
      pullUpload: {
        type: [Boolean, Object],
        default: false
      },
      //=>滚动事件
      roll: {
        type: Boolean,
        default: false
      },
      //=>滚动事件派发时机
      probeType: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this.initScroll();
      }, 20)
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) return;
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.scrollY,
          scrollX: this.scrollX,
          bounce: this.bounce,
          eventPassthrough: this.eventPassthrough,
          pullUpLoad: this.pullUpload,
          pullDownRefresh: this.pullDownRefresh
        })
        if (this.pullUpload) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd', this.scroll)
            }
          })
        }
        if (this.roll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('roll', pos, this.scroll)
          })
        }
      },
    },
    watch: {
      data: {
        handler: function () {
          this.scroll && this.scroll.refresh();
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
  }
</style>