export const useAudio = (
    audioContext: AudioContext,
    audioBuffer: AudioBuffer | Array<AudioBuffer>
) => {
    const play = () => {
        if (Array.isArray(audioBuffer)) {
            playBuffersRandom(audioContext, audioBuffer);
        } else {
            playBuffer(audioContext, audioBuffer);
        }
    };

    const playBuffer = (audioContext: AudioContext, audioBuffer: AudioBuffer) => {
        const sampleSource = audioContext.createBufferSource();
        sampleSource.buffer = audioBuffer;
        sampleSource.connect(audioContext.destination);
        sampleSource.start();
        return;
    };

    const playBuffersRandom = (audioContext: AudioContext, buffers: Array<any>) => {
        const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));
        const audioBuffer = buffers[getRandomInt(buffers.length)];
        playBuffer(audioContext, audioBuffer);
        return;
    };

    return { play };
};
