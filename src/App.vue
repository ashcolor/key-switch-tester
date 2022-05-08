<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useAudioStore } from "./stores/audio";

const audioStore = useAudioStore();
const { audioContext } = storeToRefs(audioStore);

window.AudioContext = window.AudioContext || window.webkitAudioContext;
audioContext.value = new AudioContext();
</script>

<template>
    <MyHeader />
    <div class="container mx-auto">
        <div class="text-center mt-4">
            <Icon icon="mdi:headphones" class="inline" width="18" height="18" />
            <span>Sound will be played, so pay attention to volume</span>
        </div>
        <div>
            <Sandbox />
        </div>
        <SwitchCardList />
    </div>
    <MyFooter />
</template>
