const fs = require('fs');

const contentFilePath = './content.json';
const scriptFilePath = './content/after-effects-script.js';

const save = content => {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
};
const load = () => {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
};

const saveScript = content => {
  const contentString = JSON.stringify(content);
  const scriptString = `var content = ${contentString}`;
  return fs.writeFileSync(scriptFilePath, scriptString);
};

const print = () => {
  console.dir(load(), { depth: null });
};

module.exports = {
  save,
  load,
  saveScript,
  print,
};
