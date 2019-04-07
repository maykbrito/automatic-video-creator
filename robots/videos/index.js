const {
  convertAllImages,
  createAllSentenceImages,
  createYouTubeThumbnail,
} = require('./assets');

const {
  createAfterEffectsScript,
  renderVideoWithAfterEffects,
} = require('./video');

const { compress, clean } = require('./cleaner');

async function robot(content) {
  await convertAllImages(content);
  await createAllSentenceImages(content);
  await createYouTubeThumbnail();
  await createAfterEffectsScript(content);
  await renderVideoWithAfterEffects(content);
  await compress(content.destinationVideoFile);
  await clean(content.destinationVideoFile);
}

module.exports = robot;
