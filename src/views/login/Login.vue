<template>
  <div id="login" ref="login">
    <header class="bg">
      <img src="../../assets/images/login.jpg" height="300" width="686" alt=""/>
    </header>
    <section class="login">
      <div class="login-menu">
        <button :class="{'active' :login.mode===0}" @click="toggleLoginMode">手机号登录</button>
        <button :class="{'active' :login.mode===1}" @click="toggleLoginMode">邮箱登录</button>
      </div>
      <div class="iphone">
        <form action="">
          <label for="" v-show="login.mode===0">
            <span>{{login.type}}</span>
            <input @input="verification" type="text"
                   v-model="inputInfo.phone" :placeholder="login.type">
            <span v-show="errors.phone">{{errors.phone}}</span>
          </label>
          <label v-show="login.mode===1" for="">
            <span>{{login.type}}</span>
            <input @input="verification" type="text"
                   v-model="inputInfo.email" :placeholder="login.type">
            <span v-show="errors.email">{{errors.email}}</span>
          </label>
          <label for="">
            <span>密码</span>
            <input ref="pw" type="password" v-model="inputInfo.pw" placeholder="密码">
            <span @click="plaintext" v-show="showPW" class="show">
           <i class="iconfont icon-eye"></i>
         </span>
            <span @click="plaintext" v-show="!showPW" class="hide">
            <i class="iconfont icon-biyan"></i>
          </span>
          </label>
          <label for="">
            <span>确认密码</span>
            <input @input="confirmPW" type="password" v-model="inputInfo.cnpw" placeholder="确认密码">
            <span>{{errors.cnpw}}</span>
          </label>
          <label v-show="login.mode ===0  " for="">
            <span>验证码</span>
            <input @input="verification" type="text" v-model="inputInfo.authCode" placeholder="验证码">
            <!--            type="button" 不添加的话会导致发送验证码的时候自动刷新网页-->
            <button type="button" class="auth-code" :class="{'sending':authCode.receiving}"
                    @click="sendVerificationCode">发送验证码
            </button>
            <span class="count-down">{{authCode.count}}</span>
            <span>{{errors.authCode}}</span>
          </label>
        </form>
      </div>
      <div class="login-btn">
        <button @click="loginStart">登录</button>
      </div>
    </section>
  </div>
</template>

<script>
  import {
    phoneLogin,
    sendAuthCode,
    verifyAuthCode,
    emailLogin
  } from "../../api";

  export default {
    name: "Login",
    data() {
      return {
        login: {mode: 0, hint: 0, type: '手机号'},
        inputInfo: {phone: '', pw: '', cnpw: '', email: '', authCode: ''},
        errors: {phone: '', email: '', cnpw: '', authCode: ''},
        authCode: {count: 60, receiving: false, code: 0},
        showPW: false,
        verifyResult: {pw: false, phone: false, email: false},
        phoneReg: /^1[345678]\d{9}$/,
        emailReg: /^[\w]{4,20}@1[2|6][3|6]\.com$/,
      }
    },
    methods: {
      //=>展示和隐藏密码
      plaintext() {
        this.showPW = !this.showPW;
        this.showPW ? this.$refs.pw.type = 'text' : this.$refs.pw.type = 'password';
      },
      //=>验证
      verification() {
        //=>验证手机号
        if (this.login.mode === 0) {
          if (this.inputInfo.phone.length === 0) {
            this.errors.phone = '号码为空'
            this.verifyResult.phone = false;
          } else if (!this.phoneReg.test(this.inputInfo.phone)) {
            this.errors.phone = '格式错误';
            this.verifyResult.phone = false;
          } else {
            this.errors.phone = '';
            this.verifyResult.phone = true;
          }
          return;
        }
        //=>验证邮箱
        if (this.login.mode === 1) {
          if (this.inputInfo.email.length === 0) {
            this.errors.email = '邮箱为空'
            this.verifyResult.email = false;
          } else if (!this.emailReg.test(this.inputInfo.email)) {
            this.errors.email = '格式错误'
            this.verifyResult.email = false;
          } else {
            this.errors.email = '';
            this.verifyResult.email = true;
          }
        }
        this.resize()
      },
      //=>发送验证码
      async sendVerificationCode() {
        if (this.authCode.count > 0 && this.authCode.count < 60) return;
        this.verification();
        if (this.errors.phone.length === 0) {
          try {
            await sendAuthCode(this.inputInfo.phone);
            this.authCode.receiving = true;
            let timer = setInterval(() => {
              this.authCode.count--;
              if (this.authCode.count === 0) {
                clearInterval(timer)
                this.authCode.count = 60;
                this.authCode.receiving = false;
              }
            }, 1000)
          } catch (e) {
            console.log(e)
          }
        }
      },
      //=>点击登录
      async loginStart() {
        this.confirmPW()
        this.verification();
        //=>s手机登录验证验证码
        if (this.login.mode === 0) {
          if (this.inputInfo.authCode.length === 0) {
            this.errors.authCode = '验证码为空';
            this.verifyResult.phone = false;
          } else {
            if (this.verifyResult.phone && this.verifyResult.pw) {
              try {
                await verifyAuthCode(this.inputInfo.phone, this.inputInfo.authCode);
                this.errors.authCode = '';
                try { //=>走到这里说明前端验证没问题，发送请求验证后端
                  let user = null;
                  user = await phoneLogin(this.inputInfo.phone, this.inputInfo.pw);
                  //如果状态为200则登录成功，否则就手动抛出一个错误，进入catch语句
                  if (user.code === 200) {
                    this.$bus.$emit('userInfo', user.profile)
                    user = null;
                    this.$router.replace({
                      path: '/profile',
                    })
                  } else {
                    throw '1';
                  }
                } catch (e) {
                  alert('账号或者密码错误');
                }
              } catch (e) {
                this.errors.authCode = '验证码错误'
              }
            }
          }
        } else {
          try {
            this.verification();
            this.confirmPW();
            if (this.verifyResult.email && this.verifyResult.pw) {
              let user = null;
              user = (await emailLogin(this.inputInfo.email, this.inputInfo.pw))
              if (user.code === 200) {
                this.$bus.$emit('userInfo', user.profile)
                user = null;
                this.$router.replace({
                  path: '/profile',
                })
              } else {
                throw '1';
              }
            }
          } catch (e) {
            alert('账号或者密码错误');
          }
        }
      },
      //=>验证密码
      confirmPW() {
        if (this.inputInfo.pw !== this.inputInfo.cnpw) {
          this.errors.cnpw = '密码不一致'
          this.verifyResult.pw = false;
        } else if (this.inputInfo.pw.length === 0 || this.inputInfo.cnpw.length === 0) {
          this.errors.cnpw = '密码为空';
          this.verifyResult.pw = false;
        } else {
          this.errors.cnpw = '';
          this.verifyResult.pw = true;
        }
      },
      //=>切换登录模式
      toggleLoginMode() {
        if (this.login.mode === 0) {
          this.login.mode = 1;
          this.login.type = '邮箱'
        } else {
          this.login.mode = 0;
          this.login.type = '手机号'
        }
        this.errors = {phone: '', email: '', cnpw: '', authCode: ''};
      },
      //=>解决软键盘遮挡输入框
      resize() {
        let w = window.innerHeight;
        window.addEventListener('resize', () => {
          let nw = window.innerHeight;
          this.login.type = nw - w;
          this.$refs.login.style.top = nw - w >= 0 ? 0 : nw - w + 'px';
        })
      },
    },
  }
</script>

<style scoped lang="less">
  @import "@less/mixins";

  #login {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: #a81310;
    // overflow: auto; //overflow:auto;简单解决移动端键盘遮挡输入框的问题
    text-align: center;
    color: #fff;

    .login {
      background: #a81310;

      .login-menu {
        button {
          width: 80px;
          height: 30px;
          background: none;
          color: #fff;
          margin: 0 10px;
        }

        .active {
          border: 1px solid;
        }
      }

      .iphone {
        width: 350px;
        text-align: left;
        margin-left: 50%;
        transform: translateX(-50%);

        label {
          display: block;
          margin: 30px 10px;
          position: relative;
          line-height: 30px;

          button {
            color: #000000;
            background: none;
          }

          .sending {
            color: #928f8f;
          }

          span:nth-child(1) {
            display: inline-block;
            width: 60px;
          }

          input {
            width: 200px;
            height: 30px;
            font-size: 14px;
          }

          .show, .hide {
            position: relative;
            right: 30px;
            color: #a81310;
            vertical-align: middle;

            .iconfont {
              font-size: 22px;
            }
          }

          .auth-code, .count-down {
            position: absolute;
            right: 76px;
            top: 6px;
          }

          .count-down {
            font-size: 18px;
            right: 150px;
            top: 0;
            color: #a81310;
          }
        }
      }

      .login-btn {
        width: 100%;
        height: 60px;

        button {
          width: 60px;
          height: 30px;
          background: none;
          color: #fff;
          font-size: 16px;
          margin: 20px 30px;
          border: 1px solid;
        }
      }
    }
  }
</style>