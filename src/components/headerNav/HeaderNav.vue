<template>
  <div class="header-nav">
    <div>
      <slot name="left">1</slot>
    </div>
    <div :style="{flex:site}">
      <slot name="center">2</slot>
    </div>
    <div>
      <slot name="right">3</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderNav",
    props: {
      site: {
        type: [Number,String],
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

  .header-nav div {
    flex: 1;
  }
</style>