<template>
  <div id="profile">
    <HeaderNav></HeaderNav>
    <header class="user-info">
      <div class="user-img">
        <img v-if="notLog" src="../../assets/images/defaultUSER.jpg" height="60" width="60" alt=""/>
        <img v-else :src="user.avatarUrl" height="60" width="60" alt=""/>
      </div>
      <div class="user-name">
        <h3>{{user.nickname||'登录后立享双端同步'}}</h3>
      </div>
      <div class="log-btn">
        <router-link v-if="!user.userId" to="/login" tag="button">立即登录</router-link>
        <button v-else @click="logoff">退出登录</button>
      </div>
    </header>
    <section id="private">
      <div class="personality">
        <div class="recommend" @click="showDetail(null,1)">
          <img src="../../assets/images/default3.png" height="80" width="80" alt=""/>
          <span>每日推荐</span>
        </div>
        <div class="like-list" @click="showDetail(likeList,2)">
          <img v-if="!likeList.cover" src="../../assets/images/default3.png" height="80" width="80" alt=""/>
          <img v-else :src="likeList.cover" alt="" height="80" width="80">
          <span>我的喜欢</span>
        </div>
        <div @click="showDetail(null,3)" class="history-play">
          <img src="../../assets/images/default3.png" height="80" width="80" alt=""/>
          <span>历史播放</span>
        </div>
      </div>
      <div class="song-list">
        <h2>我的歌单</h2>
        <ul>
          <li v-for="list in songList" :key="list.id" @click="showDetail(list,2)">
            <img :src="list.cover" alt="" height="60" width="60">
            <div class="summary">
              <span>{{list.name}}</span>
              <span class="count">{{list.count||'0'}}首</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <keep-alive>
      <router-view></router-view>
      s
    </keep-alive>
  </div>
</template>

<script>
  import {getUserSongList, loginStatus, logout} from "../../api";
  import {utils} from "../../utils/utils";

  export default {
    name: "Profile",
    data() {
      return {
        notLog: true,
        songList: [],
        user: {},
        likeList: [],
      }
    },
    methods: {
      async getSongList() {
        try {
          this.user = (await loginStatus()).profile;
          this.songList = utils.reData((await getUserSongList(this.user.userId)).playlist, 'songList');
          this.likeList = (this.songList.splice(0, 1))[0];
          this.notLog = false;
        } catch (e) {
          this.notLog = true;
        }
      },
      showDetail(list, loca) {
        if (!this.user.userId) {
          alert('需要登录');
          return;
        }
        switch (loca) {
          case 1:
            this.$router.push('/profile/recommend')
            break;
          case 2:
            this.$router.push({
              path: `/home/songList/${list.id}`,
            })
            break;
          case 3:
            this.$router.push({path: `/profile/historyPlay/${this.user.userId}`})
        }
      },
      async logoff() {
        try {
          await logout();
          location.reload();
        } catch (e) {
          console.log(e)
        }
      },
    },
    mounted() {
      //=>将获取到的用户信息绑定到全局事件总线，不使用vuex
      this.$bus.$on('userInfo', (user) => {
        this.user = user;
        this.$nextTick(() => {
          location.reload()
        })
      })
      if (Object.keys(this.user).length === 0) {
        this.getSongList()
      }
    },
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #profile {
    width: 100%;
    padding-top: 120px;
    color: #323030;

    .user-info {
      width: 100%;
      height: 60px;
      line-height: 60px;

      .user-img {
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-left: 10px;
      }

      .user-name {
        float: left;
        height: 60px;
        font-size: 16px;
        margin-left: 10px;
      }

      .log-btn {
        float: right;
        margin-right: 10px;

        button {
          width: 80px;
          height: 25px;
          background: #e4e4e4;
          border-radius: 12px;
        }
      }
    }

    #private {
      width: 100%;

      .personality {
        margin: 30px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        div {
          width: 80px;
          height: 120px;
          box-sizing: border-box;
          text-align: center;
        }
      }

      .song-list {
        margin: 0 10px;
        position: relative;

        h2 {
          font-size: 20px;
          font-weight: bold;
        }

        ul {
          width: 100%;
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          li {
            width: 45%;
            height: 60px;
            margin: 5px 0;
            position: relative;

            .summary {
              position: absolute;
              left: 70px;
              top: 50%;
              transform: translateY(-50%);

              .count {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>