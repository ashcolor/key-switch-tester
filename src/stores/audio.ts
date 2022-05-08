import { defineStore } from "pinia";
import { CONSTS } from "../utils/constants";

export const useAudioStore = defineStore("audio", {
    state: () => ({
        audioContext: null,
        selectedSwitchId: 1,
        volume: 1,
    }),
    getters: {
        selectedSwitch: (state) => CONSTS.KEY_SWITCHES.find((e) => e.id === state.selectedSwitchId),
    },
    actions: {
        setSelectedSwitchId(id) {
            this.selectedSwitchId = id;
        },
    },
});
