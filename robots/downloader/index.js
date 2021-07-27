/* eslint-disable no-dupe-keys */
/* eslint-disable no-plusplus */
const imageDownloader = require('image-downloader')

const downloadAndSave = async (url, fileName) =>
  imageDownloader.image({
    url,
    url,
    dest: `./content/${fileName}`
  })

const downloadAllImages = async content => {
  content.downloadedImages = []

  for (
    let sentenceIndex = 0;
    sentenceIndex < content.sentences.length;
    sentenceIndex++
  ) {
    const { images } = content.sentences[sentenceIndex]

    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      const imageUrl = images[0][imageIndex]

      try {
        if (content.downloadedImages.includes(imageUrl)) {
          throw new Error('Imagem já foi baixada')
        }

        await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
        content.downloadedImages.push(imageUrl)
        console.log(
          `> [${sentenceIndex}][${imageIndex}] Baixou imagem com sucesso: ${imageUrl}`
        )
        break
      } catch (error) {
        console.log(
          `> [${sentenceIndex}][${imageIndex}] Erro ao baixar (${imageUrl}): ${error}`
        )
      }
    }
  }
}

module.exports = {
  downloadAndSave,
  downloadAllImages
}
