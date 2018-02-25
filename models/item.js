const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Item',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: [2, 'Path `title` is too short.'],
      maxlength: [100, 'Path `title` is too long.'],
      validate: {
        validator: function(v) {
          return /\w/.test(v);
        },
        message: 'Path `title` needs words.'
      }
    },
    description: {
      type: String,
      required: true,
      minlength: [5, 'Path `description` is too short.']
    },
    imageUrl: {
      type: String,
      required: true
    },
  })
);
