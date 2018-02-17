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

      const response = await request(app).get('/items/' + item._id.toString() + '/update');

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
});
