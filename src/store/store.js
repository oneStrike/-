import Vue from 'vue';
import VueStore from 'vuex';

Vue.use(VueStore);

import getter from './getter';
import state from './state';
import mutations from './mutations';
import actions from './actions';

const store = {
  getter,
  state,
  mutations,
  actions,
};
export default store;