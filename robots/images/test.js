const { searchImages } = require('./search-images')
const { downloadAndSave } = require('../downloader')

;(async () => {
  const term = 'typing'
  const links = await searchImages(term, { imgSize: 'large', per_page: 5 })
  for (const link of links) {
    const url = link.link
    const filename = `${term}-${Date.now()}.${link.type}`
    await downloadAndSave(url, filename)
  }
})()
