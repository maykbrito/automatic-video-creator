const readline = require('readline-sync')
const unidecode = require('unidecode')
const cheerio = require('cheerio')
const axios =  require('axios');


const Providers = {}

Providers.Imdb = async () => {
  try {
    const url = "https://www.imdb.com/search/title?count=10&title_type=feature,tv_series&ref_=nv_wl_img_2"
    const cssPath = "div.lister-list div.lister-item h3 a"
    
    const {data} = await axios.get(url)
    let $ = cheerio.load(data)
    
    const trends = []
    $(cssPath).map((key, element) => trends.push($(element).text()))
    
    return trends
  }
  catch(err) {
    console.log(err)
  }
}

Providers.Google = async () => {
  const url = "https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR"

  const {data} = await axios.get(url)
  let $ = cheerio.load(data, {xmlMode: true})
  
  const trends = []
  $('item').map( (key, element) => trends.push( unidecode($(element).children('title').text()) ) )
  
  return trends
}

const Trends = async () => {
  try {
    const providers = ['Google', 'Imdb']
    const providerKey = await askForProvider()

    return await askAndReturnTrend(providers[providerKey])

    async function askForProvider() {
      return readline.keyInSelect(providers, 'Choose your trend provider:')
    }

    async function askAndReturnTrend(provider) {
      console.log(`Searchin in ${provider} Please Wait...` )
      const trends = await Providers[provider]()
      const choice = readline.keyInSelect(trends, 'Choose your trend:')
      
      return trends[choice] 
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports = Trends