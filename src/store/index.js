import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import robinhood from './robinhood';
import optionstrategy from './optionstrategy';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      robinhood,
      optionstrategy,
    },
    plugins: [createPersistedState()],
    strict: true,
  });

  return Store;
}
