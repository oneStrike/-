import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//懒加载路由组件
const recommend = () => import('../views/recommend/Recommend')
const Profile = () => import('../views/profile/Profile')
const PlayPage = () => import('../views/playPage/PlayPage')

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
    path: '/profile',
    component: Profile,
  },
  {
    path: '/playpage',
    component: PlayPage
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});
export default router;