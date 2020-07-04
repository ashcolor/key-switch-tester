<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <h1>Key Switch Tester</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn href="https://twitter.com/ashcolor06" target="_blank" text>
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
    <v-btn href="mailto:ashcolor27@gmail.com" target="_blank" text>
      <v-icon>mdi-email-open-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "MyHeader"
};
</script>