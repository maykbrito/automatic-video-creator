const Parser = require('rss-parser')
const readline = require('readline-sync')
const unidecode = require('unidecode')

const Trends = async () => {

    const TREND_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR' 

    return askAndReturnTrend()

    async function askAndReturnTrend() {
        console.log('Please Wait...')
        const trends = await getGoogleTrends()
        const choice = readline.keyInSelect(trends, 'Choose your trend:')
        
        return trends[choice] 
      }
    
      async function getGoogleTrends () {
        const parser = new Parser()
        const trends = await parser.parseURL(TREND_URL)
        
        return trends.items.map(({title}) => unidecode(title))
      }
    
}

module.exports = Trends