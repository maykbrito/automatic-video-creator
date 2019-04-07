const readline = require('readline-sync');
const trends = require('./trends');
const wikipedia = require('./wikipedia');

const askAndReturnSearchTerm = async () => {
  const response = readline.question(
    'Type a Wikipedia search term or <enter> for suggestions: '
  );
  const selectedTerm = response || (await trends());
  return selectedTerm;
};

const askAndReturnPrefix = () => {
  const prefixes = ['Quem é', 'O que é', 'A História de'];
  const selectedPrefixIndex = readline.keyInSelect(
    prefixes,
    'Choose one option: '
  );
  const selectedPrefixText = prefixes[selectedPrefixIndex];

  return selectedPrefixText;
};

const searchAndFetchWikipedia = async content => {
  await wikipedia(content);
};

module.exports = {
  askAndReturnSearchTerm,
  askAndReturnPrefix,
  searchAndFetchWikipedia,
};
