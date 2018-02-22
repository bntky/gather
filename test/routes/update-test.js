const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {seedItemToDatabase, parseAttributeFromHTML, parseTextFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/update', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders existing item for update', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app).get(`/items/${item._id}/update`);

      assert.equal(
        parseAttributeFromHTML(response.text, 'input#title-input', 'value'),
        item.title);
      assert.equal(
        parseAttributeFromHTML(response.text, 'input#imageUrl-input', 'value'),
        item.imageUrl);
      assert.equal(
        parseTextFromHTML(response.text, 'textarea#description-input'),
        item.description);
    });
  });

  describe('POST', () => {
    it('makes changes to existing item in the database', async () => {
      const item = await seedItemToDatabase();
      const newItem = {
        title: 'Changing the title',
        description: 'The item is totally different now',
        imageUrl: 'http://something.to.look.at.com/my.png'
      };

      const response = await request(app).
            post(`/items/${item._id}/update`).
            type('form').
            send(newItem);

      const updatedItem = await Item.findById(item._id);

      assert.equal(updatedItem.title, newItem.title);
      assert.equal(updatedItem.description, newItem.description);
      assert.equal(updatedItem.imageUrl, newItem.imageUrl);
    });

    it('existing item in database not modified to be invalid', async () => {
      const item = await seedItemToDatabase();
      const newItem = {
        title: undefined,
        description: item.description,
        imageUrl: item.imageUrl
      };

      const response = await request(app).
            post(`/items/${item._id}/update`).
            type('form').
            send(newItem);

      const updatedItem = await Item.findById(item._id);

      assert.equal(response.status, 400);
      assert.strictEqual(updatedItem.title, item.title);
    });
  });
});
