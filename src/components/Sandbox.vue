<script setup lang="ts">
import { useAudio } from "../composables/useAudio";
import { useAudioStore } from "../stores/audio";
import { CONSTS } from "../utils/constants";
import { util } from "../utils/util";

const textareaRef = ref();
const buffers = [];

const audioStore = useAudioStore();
const audioContext = computed(() => audioStore.audioContext);
const selectedSwitch = computed(() => audioStore.selectedSwitch);
const { play } = useAudio(audioContext.value, buffers);

onMounted(() => {
    loadSample(selectedSwitch.value.file);
    textareaRef.value.focus();
});

watch(selectedSwitch, () => {
    loadSample(selectedSwitch.value.file);
    textareaRef.value.focus();
});

const loadSample = async (id: string) => {
    buffers.splice(0);
    for (let i = 0; i < selectedSwitch.value.sample; i++) {
        buffers[i] = await util.getAudioBufferFromUrl(`${CONSTS.STORAGE_PATH}/${id}${i}.mp3`);
    }
};
</script>

<template>
    <div class="form-control">
        <textarea
            ref="textareaRef"
            class="textarea textarea-bordered h-48 font-electronic"
            placeholder="Test key switch sounds."
            @keydown="play()"
        />
        <label class="label">
            <span class="label-text-alt">
                {{ selectedSwitch.english }}
            </span>
        </label>
    </div>
</template>
