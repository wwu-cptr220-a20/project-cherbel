const fs = require('fs');
const cheerio = require('cheerio') //for html testing
const fetchMock = require('fetch-mock');

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/about-us/about-us.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once
