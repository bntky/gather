const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase, fakeId} = require('../setup-teardown-utils');

describe('Server path: /items/:id/undo', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {
    it('seed a new item in the database, deletes it, and then undeletes it', async () => {
      const item = await seedItemToDatabase();

      await request(app).
            post(`/items/${item._id}/delete`).
            type('form').
            send({});
      const response = await request(app).
            post(`/items/${item._id}/undo`).
            type('form').
            send({});

      const undeletedItem = await Item.findById(item._id);

      assert.isNotNull(undeletedItem, 'Item not restored to the database');
      assert.equal(undeletedItem.title, item.title);
      assert.equal(undeletedItem.description, item.description);
      assert.equal(undeletedItem.imageUrl, item.imageUrl);
    });

  });
});
