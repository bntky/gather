const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase, parseAttributeFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase, fakeId} = require('../setup-teardown-utils');

describe('Server path: /items/:id/title', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('PUT', () => {
    it("Updates an item's title with a new title", async () => {
      const item = await seedItemToDatabase();
      const id = item._id;
      const newTitle = 'Call it something else';
      const response = await request(app).
            put(`/items/${id}/title`).
            set('Content-Type', 'text/plain').
            send(newTitle);

      const updatedItem = await Item.findById(id);

      assert.equal(updatedItem.title, newTitle);
    });

    it('will not update a title with invalid data', async () => {
      const item = await seedItemToDatabase();
      const id = item._id;
      const newTitle = '';
      const response = await request(app).
            put(`/items/${id}/title`).
            set('Content-Type', 'text/plain').
            send(newTitle);

      const updatedItem = await Item.findById(id);

      assert.equal(response.status, 400);
    });

    it('will not update a nonexistent item', async () => {
      const id = fakeId('DEADbeefBEEF');
      const newTitle = 'Call it something else';

      const response = await request(app).
            put(`/items/${id}/title`).
            set('Content-Type', 'text/plain').
            send(newTitle);

      assert.equal(response.status, 404);
    });
  });
});

describe('Server path: /items/:id/descripiton', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('PUT', () => {
    it("Updates an item's description with a new description", async () => {
      const item = await seedItemToDatabase();
      const id = item._id;
      const newDescription = 'Describing it in a new and different way blah...';
      const response = await request(app).
            put(`/items/${id}/description`).
            set('Content-Type', 'text/plain').
            send(newDescription);

      const updatedItem = await Item.findById(id);

      assert.equal(updatedItem.description, newDescription);
    });

    it('will not update a description with invalid data', async () => {
      const item = await seedItemToDatabase();
      const id = item._id;
      const newDescription = '';
      const response = await request(app).
            put(`/items/${id}/description`).
            set('Content-Type', 'text/plain').
            send(newDescription);

      const updatedItem = await Item.findById(id);

      assert.equal(response.status, 400);
    });
  });
});
