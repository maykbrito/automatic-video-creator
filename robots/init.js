const readline = require('readline-sync');
const trends = require('./trends');

const askAndReturnSearchTerm = async () => {
  const response = readline.question(
    'Type a Wikipedia search term or <enter> for suggestions: '
  );
  const selectedTerm = response || (await trends());
  return selectedTerm;
};

const askAndReturnPrefix = () => {
  const prefixes = ['Who is', 'What is', 'The history of'];
  const selectedPrefixIndex = readline.keyInSelect(
    prefixes,
    'Choose one option: '
  );
  const selectedPrefixText = prefixes[selectedPrefixIndex];

  return selectedPrefixText;
};

const init = async () => {
  const content = {
    searchTerm: await askAndReturnSearchTerm(),
    prefix: askAndReturnPrefix(),
    sourceContent: {},
    maxSentences: 7,
  };

  return content;
};

module.exports = init;
