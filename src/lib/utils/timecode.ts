const FRAMES_PER_SECOND = 24;

export const formatTimecode = (time: number = 0): string => {
  const safeTime = Number.isFinite(time) ? Math.max(0, time) : 0;
  const totalSeconds = Math.floor(safeTime);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const frames = Math.floor((safeTime - totalSeconds) * FRAMES_PER_SECOND);

  return [hours, minutes, seconds, frames]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':');
};
