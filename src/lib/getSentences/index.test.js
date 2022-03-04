const { equal } = require('assert');
const getSentences = require('./')
let testText = `Hello there! This is sentence number two. Here, a third sentence. Washington D.C is a great place.`;
equal(getSentences(testText).length, 4);
