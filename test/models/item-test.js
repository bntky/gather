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

    it('includes word characters', () => {
      const title = '    !!  *** {} ^';
      const item = new Item({title});

      item.validateSync();

      assert.equal(item.errors.title.message, 'Path `title` needs words.');
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

    it('is at least 5 characters long', () => {
      const description = 'foo ';
      const item = new Item({description});

      item.validateSync();

      assert.equal(item.errors.description.message, 'Path `description` is too short.');
    });

    it('is no longer than 10,000 characters', () => {
      const description = ('i'.repeat(9) + ' ').repeat(1000) + '.';
      const item = new Item({description});

      item.validateSync();

      assert.equal(item.errors.description.message, 'Path `description` is too long.');
    });

    it('has two or more words', () => {
      const description = 'foobar!';
      const item = new Item({description});

      item.validateSync();

      assert.equal(item.errors.description.message,
                   'Path `description` needs to have multiple words.');
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

    it('is a valid HTTP URL', () => {
      const imageUrl = 'file:///foo/bar.png';
      const item = new Item({ imageUrl });

      item.validateSync();

      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is not a valid HTTP URL.');
    });
  });
});
