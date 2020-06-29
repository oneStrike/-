<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
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
        })
      }
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