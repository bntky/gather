const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase, parseAttributeFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('returns an item with a title and description', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app).get('/items/' + item._id.toString());

      assert.include(parseTextFromHTML(response.text, '#item-title'),
                     item.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'),
                     item.description);
    });

    it('returns an item with a different title', async () => {
      const title = 'A different item';
      const item = await seedItemToDatabase({title});

      const response = await request(app).get('/items/' + item._id.toString());

      assert.include(parseTextFromHTML(response.text, '#item-title'),
                     item.title);
    });

    it('returns an item with the correct image URL', async () => {
      const imageUrl = 'https://my.image.url.com/foobar.png';
      const item = await seedItemToDatabase({imageUrl});

      const response = await request(app).get('/items/' + item._id.toString());

      assert.include(parseAttributeFromHTML(response.text, '.single-item-img img',
                                            'src'), imageUrl);
    });
  });
});
