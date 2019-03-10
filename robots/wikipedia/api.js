const superAgent =  require('superagent');
const wikipediaApiUrl = 'https://pt.wikipedia.org/w/api.php'

exports.fetchTerms = async searchTerm => {
    const response = await superAgent.get(wikipediaApiUrl)
    .query({
        action:'opensearch',
        search: searchTerm,
        limit:5,
        namespace:0,
        format:'json'
    })

    return response.body
}

exports.fetchContent = async title => {
    console.log('Searching content...')

    const response = await superAgent.get(wikipediaApiUrl)
    .query({
        action: 'query',
        prop: 'extracts|images|info|extlinks',
        redirects: 1,
        exsectionformat: 'wiki',
        explaintext: true,
        titles: title,
        format: 'json'
    })

    return response.body
}

exports.fetchImageUrl = async imageTitle => {
    const response = await superAgent.get(wikipediaApiUrl)
    .query({
        action: 'query',
        prop:   'imageinfo',
        titles: imageTitle,
        format: 'json',
        iiprop: 'url'
    })

    return response.body
}