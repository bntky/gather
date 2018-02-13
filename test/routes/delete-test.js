const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {
    it('seed a new item in the database and delete it', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app).
            post('/items/' + item._id.toString() + '/delete').
            type('form').
            send({});

      const deletedItem = await Item.findById(item._id);

      assert.isNull(deletedItem, 'Item was not removed from the database');
    });
  });
});
