<template>
  <v-app>
    <my-header />

    <v-content>
      <v-container>
        <v-row class="text-center">
          <v-col class="mb-4">
            <h1 class="display-1 font-weight-bold mb-12">Key Switch Tester</h1>
            <sandbox></sandbox>
            <switch-card-list></switch-card-list>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <my-footer />
  </v-app>
</template>

<script>
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import Sandbox from "./components/Sandbox";
import SwitchCardList from "./components/SwitchCardList";

export default {
  name: "App",

  components: {
    MyHeader,
    MyFooter,
    Sandbox,
    SwitchCardList,
  },

  data: () => ({}),
};
</script>
