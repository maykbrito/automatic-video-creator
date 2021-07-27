const { GoogleCSE } = require('./google_cse')
const { Giphy } = require('./giphy')
const { Pexels } = require('./pexels')
const { Unsplash } = require('./unsplash')

const bots = [Giphy, Pexels, Unsplash]

module.exports = bots
