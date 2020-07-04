<template>
  <v-container>
    <switch-card :keySwitch="keySwitch" v-for="keySwitch in keySwitches" :key="keySwitch.id"></switch-card>
  </v-container>
</template>

<script>
import SwitchCard from "./SwitchCard";
import SWITCHDATA from "../data/switches.json";

export default {
  name: "SwitchCardList",
  components: {
    SwitchCard
  },
  data: () => ({}),
  computed: {
    keySwitches: function() {
      return SWITCHDATA;
    }
  },
  created: function() {},
  methods: {}
};
</script>
