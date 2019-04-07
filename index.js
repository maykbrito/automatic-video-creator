const robots = require('./robots');

const start = async () => {
  try {
    await robots.input();
    const content = robots.state.load();
    await robots.text(content);
    robots.state.save(content);
    await robots.images(content);
    robots.state.save(content);
    await robots.video(content);
    robots.state.save(content);
  } catch (err) {
    console.log('Error waiting for robots:\n\n ', err);
  }
};

start();
