const fs = require('fs');

const contentFilePath = './content.json';

const save = content => {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
};
const load = () => {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
};

module.exports = {
  save,
  load,
};
