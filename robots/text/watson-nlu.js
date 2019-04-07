const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');
require('dotenv').config();

const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: process.env.WATSONAPIKEY,
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
        language: 'pt',
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
