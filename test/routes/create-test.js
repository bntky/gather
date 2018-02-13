const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app).get('/items/create');

      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text,
                                     'textarea#description-input'), '');
    });
  });
  describe('POST', () => {
    it('create a new item and adds it to the database', async () => {
      const item = buildItemObject();

      const response = await request(app).
            post('/items/create').
            type('form').
            send(item);

      const createdItem = await Item.findOne(item);

      assert.ok(createdItem, 'Item was not added to the database');
    });

    it('redirects to the root page', async () => {
      const item = buildItemObject();

      const response = await request(app).
            post('/items/create').
            type('form').
            send(item);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

    it('display an error when supplied title is empty', async () => {
      const item = {
        description: 'I don\'t know what this is!',
        imageUrl: 'http://placebear.com/g/400/550'
      };

      const response = await request(app).
            post('/items/create').
            type('form').
            send(item);

      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('display an error when supplied description is empty', async () => {
      const item = {
        title: 'unknown',
        imageUrl: 'http://placebear.com/g/400/550'
      };

      const response = await request(app).
            post('/items/create').
            type('form').
            send(item);

      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('display an error when supplied imageUrl is empty', async () => {
      const item = {
        title: 'unknown',
        description: 'words sometimes numbers'
      };

      const response = await request(app).
            post('/items/create').
            type('form').
            send(item);

      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });
});
