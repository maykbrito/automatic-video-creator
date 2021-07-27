require('dotenv').config()

let pexelsClient

const searchImage = async (searchTerm, optionalParams) => {
  let perPage = optionalParams.per_page || 5
  let page = optionalParams.page || 1

  try {
    return pexelsClient.search(searchTerm, Number(perPage), page)
  } catch (error) {
    throw new Error(error)
  }
}

const Pexels = {
  async start() {
    //Require Wrapper Library
    const PexelsAPI = require('pexels-api-wrapper')
    //Create Client instance by passing in API key
    pexelsClient = new PexelsAPI(process.env.PEXELS_API_KEY)
  },

  async search(searchTerm, optionalParams) {
    const data = await searchImage(searchTerm, optionalParams)
    return data.photos.map(({ src }) => ({
      link: src.original,
      type: src.original.slice(-4).replace('.', '')
    }))
  }
}

module.exports = { Pexels }
