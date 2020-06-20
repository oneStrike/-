<template>
  <div class="header-nav">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "HeaderNav",
    props: {
      site: {
        type: [Number, String],
        default: 1,
      }
    }
  }
</script>

<style scoped lang="less">
  .header-nav {
    height: 44px;
    display: flex;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    justify-self: center;
  }

  .left, .center, .right {
    flex: 1;
  }
</style>