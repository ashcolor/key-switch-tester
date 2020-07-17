<template>
  <v-textarea
    id="sandbox"
    ref="sandbox"
    label="Test key switch sounds."
    rows="10"
    outlined
    no-resize
    v-on:keydown="playSample"
    :loading="isLoading"
    :messages="isLoading ? 'Loading...' : selectedSwitch.english"
  ></v-textarea>
</template>

<script>
export default {
  name: "Sandbox",
  data: () => ({
    isLoading: false,
    samples: Array
  }),
  computed: {
    audioCtx: function() {
      return this.$store.state.audioCtx;
    },
    keySwitches: function() {
      return this.$store.state.keySwitches;
    },
    selectedSwitchId() {
      return this.$store.state.selectedSwitchId;
    },
    selectedSwitch() {
      return this.keySwitches.find(e => e.id === this.selectedSwitchId);
    }
  },
  watch: {
    selectedSwitchId: function(val) {
      this.loadSample(val);
    }
  },
  created: function() {
    this.loadSample(this.selectedSwitchId);
  },
  methods: {
    // @https://ics.media/entry/200427/
    loadSample: async function() {
      this.isLoading = true;
      this.samples = [];
      for (let i = 0; i < this.selectedSwitch.sample; i++) {
        this.samples[i] = await this.setupSample(
          `https://storage.googleapis.com/key-switch-tester/sound/v2/${this.selectedSwitch.file}${i}.mp3`
        );
      }
      this.isLoading = false;
      this.$refs.sandbox.focus();
    },
    setupSample: async function(url) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      return audioBuffer;
    },
    playSample: function() {
      const audioBuffer = this.samples[this.getRandomInt(3)];
      const sampleSource = this.audioCtx.createBufferSource();
      sampleSource.buffer = audioBuffer;
      sampleSource.connect(this.audioCtx.destination);
      sampleSource.start();
    },
    getRandomInt: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }
};
</script>
<style>
.v-input__control {
  font-family: "Press Start 2P", cursive;
}
</style>
