/* eslint-disable global-require */
const init = require('./robots/init');

const robots = {
  text: require('./robots/text'),
  wikipedia: require('./robots/wikipedia/wikipedia'),
  images: require('./robots/images'),
};

const start = async () => {
  const content = await init();

  try {
    await robots.wikipedia(content);
    await robots.text(content);
    await robots.images(content);
  } catch (err) {
    console.log('Error waiting for robots:\n\n ', err);
  }

  console.log(JSON.stringify(content, null, 4));
};

start();
