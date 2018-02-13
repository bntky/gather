const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('returns an item with a title and description', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app).get('/items/' + item._id.toString());

      assert.equal(parseTextFromHTML(response.text, '#item-title'),
                   item.title);
      assert.equal(parseTextFromHTML(response.text, '#item-description'),
                   item.description);
    });
  });
});
