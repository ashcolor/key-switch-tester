import { defineStore } from "pinia";

export const useAudioStore = defineStore("audio", {
    state: () => ({
        audioContext: null,
        selectedSwitchId: 1,
        volume: 1,
    }),
    actions: {
        setSelectedSwitchId(id) {
            this.selectedSwitchId = id;
        },
    },
});
