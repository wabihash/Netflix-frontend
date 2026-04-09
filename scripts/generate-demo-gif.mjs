import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import GIFEncoder from 'gif-encoder-2';

const rootDir = process.cwd();
const imagesDir = path.join(rootDir, 'docs', 'images');
const outputPath = path.join(imagesDir, 'demo.gif');

const frames = [
  { file: 'home.png', delayMs: 1400 },
  { file: 'login.png', delayMs: 1100 },
  { file: 'register.png', delayMs: 1100 },
];

function readPng(fileName) {
  const filePath = path.join(imagesDir, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing input image: ${filePath}`);
  }
  return PNG.sync.read(fs.readFileSync(filePath));
}

function main() {
  const decoded = frames.map((f) => ({ ...f, png: readPng(f.file) }));
  const { width, height } = decoded[0].png;

  for (const frame of decoded) {
    if (frame.png.width !== width || frame.png.height !== height) {
      throw new Error('All input PNG frames must have the same dimensions.');
    }
  }

  const encoder = new GIFEncoder(width, height, 'octree', false);
  const output = fs.createWriteStream(outputPath);
  encoder.createReadStream().pipe(output);

  encoder.start();
  encoder.setRepeat(0);
  encoder.setQuality(10);

  for (const frame of decoded) {
    encoder.setDelay(frame.delayMs);
    encoder.addFrame(frame.png.data);
  }

  // Hold final frame slightly longer before loop restart.
  encoder.setDelay(1500);
  encoder.addFrame(decoded[decoded.length - 1].png.data);

  encoder.finish();

  output.on('finish', () => {
    console.log(`Created GIF: ${outputPath}`);
  });
}

main();
