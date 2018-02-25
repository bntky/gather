const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Item',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: [2, 'Path `title` is too short.']
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
  })
);
