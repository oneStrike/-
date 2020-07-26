import Vue from 'vue';
import Vuex from 'vuex';
import playPage from './mode/playPage'
import userInfo from "./mode/userInfo";

Vue.use(Vuex);

import getter from './getter';
import state from './state';
import mutations from './mutations';
import actions from './actions';

const store = new Vuex.Store({
  modules: {
    playPage,
    userInfo,
  },
  getter,
  state,
  mutations,
  actions,
});
export default store;