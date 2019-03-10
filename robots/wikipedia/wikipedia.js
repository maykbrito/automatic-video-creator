const extractor = require('./extractor')
const terms = require('./terms')

module.exports = async content => {

    let sourceContent = {
        pageid: '',
        title: '',
        url: '',
        raw: '',
        summary: '',
        references: [],
        images: []
    }

    try {
        sourceContent = {...sourceContent, ...await terms.get(content)}
        content.sourceContent = {...sourceContent, ...await extractor.get(sourceContent)}
    }
    catch (err) {
        console.log(err)
    }

}