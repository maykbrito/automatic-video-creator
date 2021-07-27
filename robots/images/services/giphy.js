require('dotenv').config()
const axios = require('axios')

const getGifUrl = ({ id }) => {
  return `https://i.giphy.com/media/${id}/giphy.gif`
}

const searchGif = async (searchTerm, optionalParams) => {
  const params = new URLSearchParams({
    q: searchTerm,
    api_key: process.env.GIPHY_KEY,
    limit: optionalParams.limit || 5,
    offset: optionalParams.offset || 0
  })

  const gifUrl = 'https://api.giphy.com/v1/gifs/search?' + params.toString()
  const { data } = await axios(gifUrl)

  return data
}

// ;(async () => {
//   const term = 'asleep'
//   const { downloadAndSave } = require('./download.js')

//   const { data: gifs } = await searchGif(term)

//   for(const gif of gifs) {
//     const url = getGifUrl(gif)
//     await downloadAndSave(url, term + '-' + gif.id + '.gif')
//   }
// })()

const Giphy = {
  async start() {},
  async search(searchTerm, optionalParams) {
    const { data } = await searchGif(searchTerm, optionalParams)
    return data.map(gif => ({ link: getGifUrl(gif), type: 'gif' }))
  }
}

module.exports = { Giphy }
