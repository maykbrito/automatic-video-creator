require('dotenv'). config()
const axios = require('axios')

const getGifUrl = ({ id }) => {
  return `https://i.giphy.com/media/${id}/giphy.gif`
} 

const searchGif = async query => {
  const params = new URLSearchParams({
    q: query,
    api_key: process.env.GIPHY_KEY,
    limit: 5,
    offset: 0
  });
  
  const gifUrl = 'https://api.giphy.com/v1/gifs/search?' + params.toString()
  const { data } = await axios(gifUrl)

  return data
}

;(async () => {
  const term = 'asleep'
  const { downloadAndSave } = require('./download.js')

  const { data: gifs } = await searchGif(term)

  for(const gif of gifs) {
    const url = getGifUrl(gif)
    await downloadAndSave(url, term + '-' + gif.id + '.gif')
  }
})()

module.exports = { searchGif }