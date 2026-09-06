/**
 * Re-encode template preview recordings for fast playback.
 *
 *   node scripts/encode-previews.mjs [public/previews/name.mp4 ...]
 *
 * With no arguments every *.mp4 in public/previews that has no -720 sibling is
 * processed. For each input it writes, next to the source:
 *   name.mp4         1080p  ~2.5 Mbps cap, 30 fps, fast-start (replaces the input)
 *   name-720.mp4     720p   ~1.4 Mbps cap
 *   name-480.mp4     480p   ~0.7 Mbps cap
 *   name-poster.jpg  frame at 1.5 s
 *
 * "Fast-start" moves the MP4 index to the front of the file so the browser can
 * begin playing after the first few hundred KB instead of the whole download.
 * Needs `ffmpeg` on PATH (brew install ffmpeg) or FFMPEG=/path/to/ffmpeg.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, renameSync } from 'node:fs';
import path from 'node:path';

const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const DIR = path.join(process.cwd(), 'public/previews');

const LADDER = [
  { h: 1080, crf: 23, maxrate: '2600k', bufsize: '5200k', profile: 'high' },
  { h: 720, crf: 23, maxrate: '1400k', bufsize: '2800k', profile: 'high' },
  { h: 480, crf: 24, maxrate: '700k', bufsize: '1400k', profile: 'main' },
];

function run(args) {
  execFileSync(FFMPEG, ['-y', '-v', 'error', ...args], { stdio: 'inherit' });
}

const inputs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(DIR)
      .filter((f) => /\.mp4$/.test(f) && !/-(1080|720|480)\.mp4$|\.tmp\.mp4$/.test(f) && !existsSync(path.join(DIR, f.replace(/\.mp4$/, '-720.mp4'))))
      .map((f) => path.join(DIR, f));

if (!inputs.length) {
  console.log('Nothing to encode — every preview already has quality variants.');
  process.exit(0);
}

for (const input of inputs) {
  const base = input.replace(/\.mp4$/, '');
  const name = path.basename(base);
  console.log(`\n▶ ${name}`);
  for (const { h, crf, maxrate, bufsize, profile } of LADDER) {
    const out = h === 1080 ? `${base}.tmp.mp4` : `${base}-${h}.mp4`;
    run([
      '-i', input, '-r', '30', '-vf', `scale=-2:${h}`,
      '-c:v', 'libx264', '-preset', 'medium', '-crf', String(crf),
      '-maxrate', maxrate, '-bufsize', bufsize, '-profile:v', profile, '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', '-an', out,
    ]);
    console.log(`  ${h}p → ${path.basename(out)}`);
  }
  run(['-ss', '1.5', '-i', input, '-frames:v', '1', '-vf', 'scale=-2:720', '-q:v', '3', `${base}-poster.jpg`]);
  // The 1080p encode takes the original's place so previewVideoUrl keeps working.
  renameSync(`${base}.tmp.mp4`, input);
  console.log(`  poster → ${name}-poster.jpg, ${name}.mp4 replaced with the fast-start 1080p`);
}
console.log('\nDone.');
