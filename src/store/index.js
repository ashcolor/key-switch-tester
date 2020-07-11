import Vue from "vue";
import Vuex from "vuex";
import SWITCHDATA from "../data/switches.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audioCtx: (function() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    })(),
    keySwitches: (function() {
      return SWITCHDATA;
    })(),
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
