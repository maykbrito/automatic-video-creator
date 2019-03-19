const readline = require('readline-sync');
const unidecode = require('unidecode');
const { fetchTerms } = require('./api');

const exitProgram = message => {
  console.log(message, '\n\n Exiting Program...');
  process.exit();
};

const doSearch = async content => {
  try {
    const [
      searchedTerm,
      optionsTerms,
      optionsSummary,
      optionsUrls,
    ] = await fetchTerms(content.searchTerm);

    if (optionsTerms.length === 0)
      exitProgram("Your search term don't return any result");

    return { optionsTerms, optionsUrls };
  } catch (err) {
    console.log('Could Not Fetch Terms From Wikipedia: ', err);
  }
};

const getTermIndex = async optionsTerms =>
  readline.keyInSelect(
    optionsTerms,
    'Confirm Your Term Search or Select One :'
  );

const getIndexFromOptionsTerms = async optionsTerms => {
  const decodedOptionsTerms = [...optionsTerms].map(term => unidecode(term));
  const selectedIndex = await getTermIndex(decodedOptionsTerms);

  return selectedIndex === -1
    ? exitProgram("You don't selected any key")
    : selectedIndex;
};

const get = async content => {
  const { optionsUrls, optionsTerms } = await doSearch(content);
  const selectedIndex = await getIndexFromOptionsTerms(optionsTerms);

  return {
    url: optionsUrls[selectedIndex],
    title: optionsTerms[selectedIndex],
  };
};

module.exports = {
  get,
};
