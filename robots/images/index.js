const { searchImages } = require('./search-images')
const { downloadAllImages } = require('../downloader/download')

const robot = async content => {
  for (const sentence of content.sentences) {
    for (const keyword of sentence.keywords) {
      const getAllImages = await searchImages(keyword, {
        imgSize: 'large',
        per_page: 5
      })
      sentence.images.push(getAllImages.map(({ link }) => link))
    }
  }

  await downloadAllImages(content)
}

module.exports = robot
