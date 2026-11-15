interface SoundControls {
  play: (soundName?: string) => void;
}

export const useSound = (): SoundControls => ({
  play: () => {},
});
