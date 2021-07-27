require('dotenv').config()
require('isomorphic-fetch')
const unsplash = require('unsplash-js')

let api

const structureImage = result => {
  return {
    ...result,
    link: result['links']['download'],
    url: result['urls']['full']
  }
}

const structureUser = result => {
  return {
    ...result,
    profile_image: result['profile_image']
      ? result['profile_image']['medium']
      : null
  }
}

const structureImageUser = (image, user) => ({
  image: structureImage(image),
  user: structureUser(user)
})

const searchPhotos = async (query, options) => {
  let result = await api.search
    .getPhotos({
      query,
      page: options.page || 1,
      perPage: options.perPage || 5
    })
    .catch(console.log)

  //error checking
  if (result.errors) throw new Error(result.errors[0])

  return result['response']['results'].map(photo =>
    structureImageUser(photo, photo['user'])
  )
}

const Unsplash = {
  async start() {
    api = unsplash.createApi({
      accessKey: process.env.UNSPLASH_KEY
    })
  },
  async search(searchTerm, optionalParams) {
    const data = await searchPhotos(searchTerm, optionalParams)
    return data.map(image => ({ link: image.image.url, type: 'jpg' }))
  }
}

/* it's working
;(async() => {
  const { downloadAndSave } = require('./download.js')
  const response = await searchPhotos('waiting')

  for (let obj of response ) {
    await downloadAndSave(obj.image.url, `${obj.image.id}.jpg`)
  }
  
})()
*/

module.exports = { Unsplash }
