const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');
const watsonApiKey = require('../credentials/watson-nlu.json').apikey;

const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey,
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/',
});

const fetchWatsonAndReturnKeywords = async sentence =>
  new Promise((resolve, reject) => {
    nlu.analyze(
      {
        text: sentence,
        features: {
          keywords: {},
        },
      },
      (error, response) => {
        if (error) {
          reject(error);
        }
        const keywords = response.keywords.map(({ text }) => text);
        resolve(keywords);
      }
    );
  });

module.exports = {
  nlu,
  fetchWatsonAndReturnKeywords,
};
