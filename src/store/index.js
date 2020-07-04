import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedSwitchId: 1,
    volume: 1,
  },
  mutations: {
    setSelectedSwitchId(state, id) {
      state.selectedSwitchId = id;
    },
  },
  actions: {},
  modules: {},
});
