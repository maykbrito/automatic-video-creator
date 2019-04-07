const { spawn } = require('child_process');
const path = require('path');
const state = require('../state');

const rootPath = path.resolve(__dirname, '../..');

const createAfterEffectsScript = async content => {
  await state.saveScript(content);
};

const renderVideoWithAfterEffects = async content =>
  new Promise((resolve, reject) => {
    const aerenderFilePath =
      'C:\\Program Files\\Adobe\\Adobe After Effects CC 2019\\Support Files\\aerender.exe';
    const templateFilePath = `${rootPath}\\templates\\1\\template.aep`;
    content.destinationVideoFile = `${rootPath}\\content\\output.mov`;

    console.log('> Starting After Effects');

    const aerender = spawn(aerenderFilePath, [
      '-comp',
      'main',
      '-project',
      templateFilePath,
      '-output',
      content.destinationVideoFile,
    ]);

    aerender.stdout.on('data', data => {
      process.stdout.write(data);
    });

    aerender.on('close', () => {
      console.log('> After Effects closed');
      resolve();
    });
  });

module.exports = { createAfterEffectsScript, renderVideoWithAfterEffects };
