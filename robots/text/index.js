const {
  sanitizeContent,
  breakContentIntoSentences,
  limitMaxSentences,
  fetchKeywordsOfAllSentences,
} = require('./text');

const robot = async content => {
  sanitizeContent(content);
  breakContentIntoSentences(content);
  limitMaxSentences(content);
  await fetchKeywordsOfAllSentences(content);
  console.log('> Builded Sentences');
};

module.exports = robot;
