const searchImages = require('./images');

const robot = async content => {
  for (const sentence of content.sentences) {
    for (const keyword of sentence.keywords) {
      const getAllImages = await searchImages(keyword, { imgSize: 'huge' });
      sentence.images.push(getAllImages.map(({ link }) => link));
    }
  }
};

module.exports = robot;
