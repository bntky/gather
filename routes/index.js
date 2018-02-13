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

router.get('/items/:id', async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (item === null) {
    res.status(404).send('Item not found');
    return;
  }
  
  res.render('single', {item});
});

router.post('/items/:id/delete', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  await item.remove();
  res.redirect('/');
});

module.exports = router;
