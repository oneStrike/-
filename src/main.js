import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import 'lib-flexible'
import VueLazyLoad from 'vue-lazyload';

//=>懒加载图片，设置加载时的默认图
Vue.use(VueLazyLoad, {
  loading: require('./assets/images/default.png')
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    //=>创建一个全局事件总线
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
