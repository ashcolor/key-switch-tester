<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAudioStore } from "../stores/audio";

interface Props {
    keySwitch: any;
}
const props = withDefaults(defineProps<Props>(), {
    keySwitch: {},
});

const audioStore = useAudioStore();
const { selectedSwitchId } = storeToRefs(audioStore);
const audioContext = computed(() => audioStore.audioContext);

const onClick = (id) => {
    playSample();
    selectedSwitchId.value = id;
};

const playSample = async () => {
    const response = await fetch(
        `https://storage.googleapis.com/key-switch-tester/sound/v2/${props.keySwitch.file}.mp3`
    );
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer);
    const sampleSource = audioContext.value.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.value.destination);
    sampleSource.start();
};
</script>

<template>
    <div
        class="card w-48 m-4 shadow-xl cursor-pointer"
        :class="{ 'bg-secondary': keySwitch.id === selectedSwitchId }"
        @click="onClick(keySwitch.id)"
    >
        <figure class="px-10 pt-10">
            <img
                :src="
                    'https://storage.googleapis.com/key-switch-tester/img/' +
                    keySwitch.file +
                    '.jpg'
                "
                :alt="keySwitch.english"
                class="rounded-xl"
                width="48"
                height="48"
            />
        </figure>
        <div class="card-body items-center text-center">
            <p class="card-title">{{ keySwitch.english }}</p>
            <p>{{ keySwitch.type1 }}</p>
            <p>{{ keySwitch.type2 }}</p>
        </div>
    </div>
</template>

<style scoped>
.card:hover:not(.active),
.card:focus:not(.active) {
    background: rgba(0, 0, 0, 0.08);
    transition: background-color 0.1s linear;
}
</style>
