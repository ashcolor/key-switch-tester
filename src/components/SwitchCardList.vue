<script setup lang="ts">
import { CONSTS } from "../utils/constants";
</script>

<template>
    <div class="flex flex-wrap justify-center">
        <SwitchCard
            :keySwitch="keySwitch"
            v-for="keySwitch in CONSTS.KEY_SWITCHES"
            :key="keySwitch.id"
        />
    </div>
</template>
