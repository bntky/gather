const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const item = new Item({title, description, imageUrl});
  item.validateSync();

  if( item.errors ) {
    res.status(400).render('create', { newItem: item });
  } else {
    await item.save();
    res.redirect('/');
  }
});

router.post('/items/:id/update', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  let item = await Item.findById(req.params.id);
  item.title = title;
  item.description = description;
  item.imageUrl = imageUrl;
  item.validateSync();

  if( item.errors ) {
    res.status(400).render('create', { newItem: req.body });
  } else {
    item.save();
    res.redirect('/');
  }
});

const useItemById = async (id, res, callback) => {
  const item = await Item.findById(id);

  if (item === null) {
    res.status(404).send('Item not found');
    return;
  }

  callback(item, res);
};

router.get('/items/:id/update', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    res.render('update', { newItem: item, id: item._id});
  });
});

router.get('/items/:id', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    res.render('single', {item});
  });
});

router.post('/items/:id/delete', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    await item.remove();
    res.redirect('/');
  });
});

router.delete('/items/:id', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    await item.remove();
    res.redirect('/');
  });
});

router.put('/items/:id/title', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    item.title = req.body;
    item.validateSync();

    if( item.errors ) {
      res.status(400).send('Invalid title: ' + item.errors);
    } else {
      item.save();
      res.redirect('/');
    }
  });
});

router.put('/items/:id/description', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    item.description = req.body;
    item.validateSync();

    if( item.errors ) {
      res.status(400).send('Invalid description: ' + item.errors);
    } else {
      item.save();
      res.redirect('/');
    }
  });
});

router.put('/items/:id/imageUrl', async (req, res, next) => {
  useItemById(req.params.id, res, async (item, res) => {
    item.imageUrl = req.body;
    item.validateSync();

    if( item.errors ) {
      res.status(400).send('Invalid imageUrl: ' + item.errors);
    } else {
      item.save();
      res.redirect('/');
    }
  });
});

module.exports = router;
