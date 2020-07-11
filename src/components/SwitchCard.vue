<template>
  <v-card
    class="d-inline-block text-left ma-6"
    :class="{ active: keySwitch.id === selectedSwitchId }"
    width="240"
    v-on:click="setSelectedSwitchId(keySwitch.id)"
  >
    <v-list-item class="transparent my-0">
      <v-list-item-avatar>
        <img
          :alt="keySwitch.english"
          :src="'https://storage.googleapis.com/key-switch-tester/img/' + keySwitch.file+ '.jpg'"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>{{ keySwitch.type1 }}</v-list-item-subtitle>

        <v-list-item-title class="headline">{{ keySwitch.english }}</v-list-item-title>
        <v-list-item-subtitle>{{ keySwitch.type2 }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img> -->

    <!-- <v-list class="transparent">
      <v-list-item>
        <v-list-item-title>Travel</v-list-item-title>
        <v-list-item-subtitle>{{ keySwitch.travel }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>actuation</v-list-item-title>
        <v-list-item-subtitle>{{ keySwitch.actuation }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>-->
    <!-- <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-volume-medium</v-icon>
      </v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  name: "SwitchCard",

  data: () => ({}),
  computed: {
    audioCtx: function() {
      return this.$store.state.audioCtx;
    },
    selectedSwitchId() {
      return this.$store.state.selectedSwitchId;
    }
  },
  props: {
    keySwitch: Object
  },
  created: function() {},
  methods: {
    setSelectedSwitchId(id) {
      this.playSample(id);
      this.$store.commit("setSelectedSwitchId", id);
    },
    playSample: async function() {
      const response = await fetch(
        `https://storage.googleapis.com/key-switch-tester/sound/v2/${this.keySwitch.file}.mp3`
      );
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      const sampleSource = this.audioCtx.createBufferSource();
      sampleSource.buffer = audioBuffer;
      sampleSource.connect(this.audioCtx.destination);
      sampleSource.start();
    }
  }
};
</script>
<style scoped>
.v-avatar {
  border: 1px solid #aaaaaa;
}
.v-card {
  cursor: pointer;
}
.v-card.active {
  background: rgba(24, 103, 192, 0.12);
}
.v-card:hover:not(.active),
.v-card:focus:not(.active) {
  background: rgba(0, 0, 0, 0.08);
  transition: background-color 0.1s linear;
}
</style>
