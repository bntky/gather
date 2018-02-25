const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('title field', () => {
    it('is a string', async () => {
      const title = 42;

      const item = new Item({ title });

      assert.strictEqual(item.title, title.toString());
    });

    it('is required', async () => {
      const item = new Item({});

      item.validateSync();

      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });

    it('is at least 2 characters long', () => {
      const title = 'a';
      const item = new Item({title});

      item.validateSync();

      assert.equal(item.errors.title.message, 'Path `title` is too short.');
    });

    it('is no longer than 100 characters', () => {
      const title = 'a'.repeat(30) + ' ' + 'b'.repeat(30) + ' ' + 'c'.repeat(39);
      const item = new Item({title});

      item.validateSync();
      
      assert.equal(item.errors.title.message, 'Path `title` is too long.');
    });
  });

  describe('description field', () => {
    it('is a string', async () => {
      const description = 42;

      const item = new Item({ description });

      assert.strictEqual(item.description, description.toString());
    });

    it('is required', async () => {
      const item = new Item({});

      item.validateSync();

      assert.equal(item.errors.description.message, 'Path `description` is required.');
    });
  });

  describe('imageUrl field', () => {
    it('is a string', async () => {
      const imageUrl = 42;

      const item = new Item({ imageUrl });

      assert.strictEqual(item.imageUrl, imageUrl.toString());
    });

    it('is required', async () => {
      const item = new Item({});

      item.validateSync();

      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
    });
  });
});
