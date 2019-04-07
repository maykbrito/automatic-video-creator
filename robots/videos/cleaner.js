const { spawn } = require('child_process');

const compress = async videoFile =>
  new Promise((resolve, reject) => {
    const compressor = spawn('ffmpeg', [
      '-i',
      `${videoFile}`,
      `${videoFile}.mp4`,
      `-y`,
    ]);

    compressor.stdout.on('data', data => process.stdout.write(data));
    compressor.stderr.on('data', data => process.stdout.write(data));

    compressor.on('close', () => {
      console.log('> Compress done!');
      resolve();
    });
  });

const clean = async videoFile =>
  new Promise((resolve, reject) => {
    const cleaner = spawn('rm', ['-r', '-f', `${videoFile}`]);

    cleaner.on('close', () => {
      console.log('> Clear done!');
      resolve();
    });
  });

module.exports = {
  compress,
  clean,
};
