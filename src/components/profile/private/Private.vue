<template>
  <div class="cla"></div>
</template>

<script>
  import {utils} from "../../../utils/utils";
  import {getLikeList, getPersonal, getRecommend, getRecord} from "../../../api";

  export default {
    name: "Private",
    data() {
      return {
        recommend: [],
        record: [],
        likeList: [],
        personal: [],
      }
    },
    props: {
      id: {
        type: Number,
        required: true,
        default: null,
      }
    },
    methods: {

    },
    mounted() {
      this.getProfileData()
    }
  }
</script>

<style scoped lang="less">

</style>