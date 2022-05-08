<script setup lang="ts">
import { useAudioStore } from "../stores/audio";
import { CONSTS } from "../utils/constants";

const textareaRef = ref();
const samples = ref([]);

const audioStore = useAudioStore();
const audioContext = computed(() => audioStore.audioContext);
const selectedSwitchId = computed(() => audioStore.selectedSwitchId);
const selectedSwitch = computed(() =>
    CONSTS.KEY_SWITCHES.find((e) => e.id === selectedSwitchId.value)
);

onMounted(() => {
    loadSample();
});

watch(selectedSwitchId, () => {
    loadSample();
});

// @https://ics.media/entry/200427/
const loadSample = async () => {
    samples.value = [];
    for (let i = 0; i < selectedSwitch.value.sample; i++) {
        samples.value[i] = await setupSample(
            `https://storage.googleapis.com/key-switch-tester/sound/v2/${selectedSwitch.value.file}${i}.mp3`
        );
    }
    textareaRef.value.focus();
};
const setupSample = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer);
    return audioBuffer;
};
const playSample = () => {
    const audioBuffer = samples.value[getRandomInt(3)];
    const sampleSource = audioContext.value.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.value.destination);
    sampleSource.start();
};
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};
</script>

<template>
    <div class="form-control">
        <textarea
            ref="textareaRef"
            class="textarea textarea-bordered h-48 font-electronic"
            placeholder="Test key switch sounds."
            @keydown="playSample()"
        />
        <label class="label">
            <span class="label-text-alt">
                {{ selectedSwitch.english }}
            </span>
        </label>
    </div>
</template>
