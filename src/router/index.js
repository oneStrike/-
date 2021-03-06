import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const SongListDetail = () => import('../views/songListDetail/SongListDetail')
const VideoPage = () => import('../views/videoPage/VideoPage')
const Search = () => import('../views/search/Search')
const SearchResult = () => import('../components/search/searchResult/SearchResult')
const Singer = () => import('../views/singer/Singer')
const SingerDetail = () => import('../components/singerDetail/SingerDetail')
const Login = () => import('../views/login/Login')
const HistoryPlay = () => import('../components/profile/historyPlay/HistoryPlay')
const Recommend = () => import('../components/profile/recommend/Recommend')

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/songList/:id',
        component: SongListDetail,
        props: true,
        meta: {
          name: 'songList'
        }
      },
      {
        path: '/home/video/:id',
        component: VideoPage,
        props: true,
        meta: {
          name: 'mv'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        path: '/profile/historyPlay/:id',
        component: HistoryPlay,
        props: true
      },
      {
        path: '/profile/recommend',
        component: Recommend,
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: '/search/result/:keywords',
        component: SearchResult,
        props: true,
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: '/singer/singerDetail/:id',
        component: SingerDetail,
        props: true,
        meta: {
          name: 'singer'
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
];

const router = new VueRouter({
  routes,
});
export default router;