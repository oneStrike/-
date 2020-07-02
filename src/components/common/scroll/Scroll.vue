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
      data: {
        type: [Array, String],
        default: null,
      },
      scrollX: {
        type: Boolean,
        default: false,
      },
      scrollY: {
        type: Boolean,
        default: false,
      },
      click: {
        type: Boolean,
        default: true,
      },
      deep: {
        type: Boolean,
        default: false,
      },
      bounce: {
        type: Boolean,
        default: false,
      },
      eventPassthrough: {
        type: String,
        default: '',
      },
      pullDownRefresh: {
        type: Boolean,
        default: false,
      },
      pullUpload: {
        type: Boolean,
        default: false
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
          click: this.click,
          scrollY: this.scrollY,
          scrollX: this.scrollX,
          bounce: this.bounce,
          eventPassthrough: this.eventPassthrough,
          pullUpload: this.pullUpload,
          pullDownRefresh: this.pullDownRefresh
        })
        if (this.pullUpload) {
          console.log(1)
          this.scroll.on('scrollEnd', () => { // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
              console.log(2)
            }
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