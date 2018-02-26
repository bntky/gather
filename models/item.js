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
      minlength: [5, 'Path `description` is too short.'],
      maxlength: [10000, 'Path `description` is too long.'],
      validate: {
        validator: function(v) {
          return /\w+\s+\w+/.test(v);
        },
        message: 'Path `description` needs to have multiple words.'
      }
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        // Found regular expression to match URL on Stack Overflow:
        // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        validator: function(v) {
          return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v);
        },
        message: 'Path `imageUrl` is not a valid HTTP URL.'
      }
    },
  })
);
