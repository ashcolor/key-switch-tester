<template>
  <v-container>
    <switch-card :keySwitch="keySwitch" v-for="keySwitch in keySwitches" :key="keySwitch.id"></switch-card>
  </v-container>
</template>

<script>
import SwitchCard from "./SwitchCard";

export default {
  name: "SwitchCardList",
  components: {
    SwitchCard
  },
  data: () => ({}),
  computed: {
    keySwitches: function() {
      return this.$store.state.keySwitches;
    }
  },
  created: function() {},
  methods: {}
};
</script>
