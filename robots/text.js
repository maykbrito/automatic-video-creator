/* eslint-disable no-shadow */
const sentenceBoundaryDetection = require('sbd');
const { fetchWatsonAndReturnKeywords } = require('./watson-nlu');

async function robot(content) {
  const sanitizeContent = content => {
    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split('\n');

      const withoutMarkdownAndBlankLines = allLines.filter(line => {
        if (line.trim().length === 0 || line.trim().startsWith('=')) {
          return false;
        }

        return true;
      });

      return withoutMarkdownAndBlankLines.join(' ');
    }

    function removeDatesInParentheses(text) {
      return text
        .replace(/\((?:\([^()]*\)|[^()])*\)/gm, '')
        .replace(/ {2}/g, ' ');
    }

    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(
      content.sourceContent.raw
    );
    const withoutDatesInParentheses = removeDatesInParentheses(
      withoutBlankLinesAndMarkdown
    );

    content.sourceContent.sanitized = withoutDatesInParentheses;
  };

  const breakContentIntoSentences = content => {
    content.sentences = [];

    const sentences = sentenceBoundaryDetection.sentences(
      content.sourceContent.sanitized
    );
    sentences.forEach(sentence => {
      content.sentences.push({
        text: sentence,
        keywords: [],
        images: [],
      });
    });
  };

  const limitMaxSentences = content => {
    content.sentences = content.sentences.slice(0, content.maxSentences);
  };

  const fetchKeywordsOfAllSentences = async content => {
    for (const sentence of content.sentences) {
      sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text);
    }
  };

  sanitizeContent(content);
  breakContentIntoSentences(content);
  limitMaxSentences(content);
  await fetchKeywordsOfAllSentences(content);
  console.log('Build Sentences');
}

module.exports = robot;
