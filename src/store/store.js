import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import getter from './getter';
import state from './state';
import mutations from './mutations';
import actions from './actions';

const store = new Vuex.Store({
  getter,
  state,
  mutations,
  actions,
});
export default store;