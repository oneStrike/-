import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//懒加载路由组件
const recommend = () => import('../views/recommend/Recommend')
const Profile = () => import('../views/profile/Profile')
const SongListDetail = () => import('../views/songListDetail/SongListDetail')
const VideoPage = () => import('../views/videoPage/VideoPage')
const Search = () => import('../views/search/Search')
const SearchResult = () => import('../components/searchResult/SearchResult')

const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: '/recommend/songList/:id',
        component: SongListDetail,
        props: true,
      },
      {
        path: '/recommend/video/:id',
        component: VideoPage,
        props: true,
      }
    ]
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: '/search/result/:key',
        component: SearchResult,
        props: true,
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});
export default router;