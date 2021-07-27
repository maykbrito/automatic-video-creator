require('dotenv').config();
require('isomorphic-fetch')
const unsplash = require('unsplash-js')

const api = unsplash.createApi({
  accessKey:process.env.UNSPLASH_KEY
});

const structureImage = result => {
  return {
      ...result,
      link:result['links']['download'],
      url:result['urls']['full']
  }
};

const structureUser = result => {
  return {
      ...result,
      profile_image:result['profile_image'] ? result['profile_image']['medium']: null
  }
};

const structureImageUser = (image, user) => ({ image: structureImage(image), user: structureUser(user) })


const searchPhotos = async (key, page = 1, perPage = 5) => {
  let result = await api.search.getPhotos({
      query: key,
      page,
      perPage,
  })
  .catch(console.log);

  //error checking
  if(result.errors) throw new Error(result.errors[0]);

  return result['response']['results']
    .map( photo => structureImageUser(photo, photo['user'])); 
};


/* it's working
;(async() => {
  const { downloadAndSave } = require('./download.js')
  const response = await searchPhotos('waiting')

  for (let obj of response ) {
    await downloadAndSave(obj.image.url, `${obj.image.id}.jpg`)
  }
  
})()
*/

module.exports = { searchPhotos }
