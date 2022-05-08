export namespace utils {
    export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

    //AudioContext
    export const getAudioBufferFromUrl = async (url: string) => {
        const audioContext = new AudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    };
    export const playBuffer = (audioContext: AudioContext, audioBuffer: AudioBuffer) => {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        sampleSource.connect(audioContext.destination);
        sampleSource.start();
        return;
    };
    export const playBuffersRandom = (audioContext: AudioContext, buffers: Array<any>) => {
        const audioBuffer = buffers[utils.getRandomInt(buffers.length)];
        playBuffer(audioContext, audioBuffer);
        return;
    };
}
