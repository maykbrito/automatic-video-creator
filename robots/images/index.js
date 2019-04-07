const searchImages = require('./images');
const { downloadAllImages } = require('./download');

const robot = async content => {
  for (const sentence of content.sentences) {
    for (const keyword of sentence.keywords) {
      const getAllImages = await searchImages(keyword, { imgSize: 'large' });
      sentence.images.push(getAllImages.map(({ link }) => link));
    }
  }

  await downloadAllImages(content);
};

module.exports = robot;
