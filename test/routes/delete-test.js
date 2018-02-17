const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase, fakeId} = require('../setup-teardown-utils');

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

    it('fail to delete a nonexistent item', async () => {
      const itemId = fakeId(12345);

      const response = await request(app).
            post('/items/' + itemId.toString() + '/delete').
            type('form').
            send({});

      assert.equal(response.status, 404);
      assert.include(response.text, 'Item not found');
    });
  });
});

// Make the interface more like a REST interface and delete with HTTP DELETE
describe('Server path: /items/:id', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('DELETE', () => {
    it('seed a new item in the database and delete it', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app).
            delete('/items/' + item._id.toString()).
            type('form').
            send({});

      const deletedItem = await Item.findById(item._id);

      assert.isNull(deletedItem, 'Item was not removed from the database');
    });
  });
});
