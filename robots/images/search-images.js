const services = require('./services')

const searchImages = async (searchTerm, optionalParams = {}) => {
  let allResults = []
  for (const service of services) {
    await service.start()
    const results = await service.search(searchTerm, optionalParams)
    for (let result of results) {
      allResults.push(result)
    }
  }

  return allResults
}

module.exports = { searchImages }
