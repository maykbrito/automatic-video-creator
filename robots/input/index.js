const state = require('../state');
const {
  askAndReturnSearchTerm,
  askAndReturnPrefix,
  searchAndFetchWikipedia,
} = require('./input');

const input = async () => {
  const content = {
    searchTerm: await askAndReturnSearchTerm(),
    prefix: askAndReturnPrefix(),
    sourceContent: {},
    maxSentences: 5,
  };

  await searchAndFetchWikipedia(content);

  state.save(content);
};

module.exports = input;
