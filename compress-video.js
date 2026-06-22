const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'public', 'FOX.mp4');
const output = path.join(__dirname, 'public', 'FOX_compressed.mp4');

console.log('--- Video Compression Script ---');
console.log('Input file:', input);
console.log('Output file:', output);

if (!fs.existsSync(input)) {
  console.error('Error: Input file public/FOX.mp4 not found.');
  process.exit(1);
}

const stats = fs.statSync(input);
const fileSizeInMegabytes = stats.size / (1024 * 1024);
console.log(`Original file size: ${fileSizeInMegabytes.toFixed(2)} MB`);

console.log('Running FFmpeg compression... (This may take a few seconds)');

try {
  // -y overwrites output if it exists
  // -vcodec libx264 compresses with standard H.264
  // -crf 28 compresses with high quality but smaller size (default is 23, higher means more compression)
  // -an strips audio track (since the background video is muted)
  execSync(`"${ffmpeg}" -y -i "${input}" -vcodec libx264 -crf 28 -an "${output}"`, { stdio: 'inherit' });
  
  if (fs.existsSync(output)) {
    const outStats = fs.statSync(output);
    const outSizeInMegabytes = outStats.size / (1024 * 1024);
    console.log('Compression complete!');
    console.log(`Compressed file size: ${outSizeInMegabytes.toFixed(2)} MB`);
    console.log(`Saved approx: ${(fileSizeInMegabytes - outSizeInMegabytes).toFixed(2)} MB!`);
  }
} catch (err) {
  console.error('Failed to compress video:', err.message);
  process.exit(1);
}
