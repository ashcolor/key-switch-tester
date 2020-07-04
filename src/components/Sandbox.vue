<template>
  <v-textarea
    id="sandbox"
    ref="sandbox"
    label="Test key switch sounds!"
    outlined
    no-resize
    v-on:keydown="playSample"
    :loading="isLoading"
    :messages="isLoading ? 'Loading...' : selectedSwitch.english"
  ></v-textarea>
</template>

<script>
import SWITCHDATA from "../data/switches.json";

export default {
  name: "Sandbox",
  data: () => ({
    isLoading: false,
    ctx: null,
    sampleDown: Array,
    sampleUp: Array,
  }),
  computed: {
    keySwitches: function() {
      return SWITCHDATA;
    },
    selectedSwitchId() {
      const switchId = this.$store.state.selectedSwitchId;
      return switchId;
    },
    selectedSwitch() {
      return this.keySwitches.find((e) => e.id === this.selectedSwitchId);
    },
  },
  watch: {
    selectedSwitchId: function(val) {
      this.loadSample(val);
    },
  },
  created: function() {
    this.loadSample(this.selectedSwitchId);
  },
  methods: {
    // @https://ics.media/entry/200427/
    loadSample: async function() {
      console.log(this.ctx);
      if (this.ctx === null) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      this.isLoading = true;
      this.sampleDown = [];
      for (let i = 0; i < this.selectedSwitch.sample; i++) {
        this.sampleDown[i] = await this.setupSample(`https://storage.googleapis.com/key-switch-tester/sound/${this.selectedSwitch.color}${i}.mp3`);
      }
      this.isLoading = false;
      this.$refs.sandbox.focus();
    },
    setupSample: async function(url) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      return audioBuffer;
    },
    playSample: function() {
      const audioBuffer = this.sampleDown[this.getRandomInt(3)];
      const sampleSource = this.ctx.createBufferSource();
      sampleSource.buffer = audioBuffer;
      sampleSource.connect(this.ctx.destination);
      sampleSource.start();
    },
    getRandomInt: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
  },
};
</script>
<style>
.v-input__control {
  font-family: "Press Start 2P", cursive;
}
</style>
