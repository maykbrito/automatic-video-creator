const https = require('https');
require('dotenv').config();

const buildParams = (params = {}) =>
  Object.keys(params)
    .map((key, index) => {
      const questionOrAmper = index === 0 ? '?' : '&';
      return `${questionOrAmper}${key}=${params[key]}`;
    })
    .join('');

const getImageSearchResults = (searchTerm, optionalParams = {}) => {
  const params = buildParams({
    key: process.env.GCSI_API_KEY,
    cx: process.env.GCSI_ID,
    q: encodeURIComponent(searchTerm),
    searchType: 'image',
    num: 5,
    imgSize: 'large',
    ...optionalParams,
  });

  const baseUrl = `https://www.googleapis.com/customsearch/v1/${params}`;

  let receiveAllData = '';

  return new Promise((resolve, reject) => {
    https
      .get(baseUrl, response => {
        response.setEncoding('utf8');

        response.on('data', data => {
          receiveAllData += data;
        });

        response.on('end', () => {
          const data = JSON.parse(receiveAllData);
          const checkForUsageLimits = data.error && data.error.errors;

          if (checkForUsageLimits) resolve(data.error.errors[0]);

          resolve(data.items ? [...data.items] : []);
        });
      })
      .on('error', e => {
        reject(e);
      });
  });
};

module.exports = getImageSearchResults;
