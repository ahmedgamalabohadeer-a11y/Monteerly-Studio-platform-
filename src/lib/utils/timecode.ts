export function formatTimecode(seconds: number, fps: number = 24): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * fps);

  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

export function formatDuration(seconds: number): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
