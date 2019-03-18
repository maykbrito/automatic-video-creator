/* eslint-disable global-require */
const init = require('./robots/init');

const robots = {
  text: require('./robots/text.js'),
  wikipedia: require('./robots/wikipedia/wikipedia'),
};

const start = async () => {
  const content = await init();

  try {
    await robots.wikipedia(content);
    await robots.text(content);
  } catch (err) {
    console.log('Error waiting for text content robot:\n\n ', err);
  }

  console.log(JSON.stringify(content, null, 4));
};

start();
