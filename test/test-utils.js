const {jsdom} = require('jsdom');

var colors = require('mocha/lib/reporters/base').colors;
colors['pass'] = '97';
colors['fast'] = '97';
colors['light'] = '97';
colors['diff gutter'] = '97';
colors['error stack'] = '97';

const Item = require('../models/item');

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || 'My favorite item';
  const imageUrl = options.imageUrl || 'http://placebear.com/g/200/300';
  const description = options.description || 'Just the best item';
  return {title, imageUrl, description};
};

// Add a sample Item object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const item = await Item.create(buildItemObject(options));
  return item;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// extract an attribute from an HTML element by selector
const parseAttributeFromHTML = (htmlAsString, selector, attribute) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);

  if (selectedElement === null) {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }

  const attrValue = selectedElement.getAttribute(attribute);

  if (attrValue === null) {
    throw new Error(`No attribute ${attribute} on element ${selector} in HTML string`);
  }

  return attrValue;
};

module.exports = {
  buildItemObject,
  seedItemToDatabase,
  parseTextFromHTML,
  parseAttributeFromHTML
};
