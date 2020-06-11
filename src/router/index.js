import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//懒加载路由组件
const recommend = () => import('../views/recommend/Recommend')
const rank = () => import('../views/rank/Rank')
const singer = () => import('../views/singer/Singer')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: recommend
  },
  {
    path: '/rank',
    component: rank,
  },
  {
    path: '/singer',
    component: singer
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});
export default router;