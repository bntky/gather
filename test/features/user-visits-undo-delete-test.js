const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits root', () => {
  describe('adds an item and deletes it', () => {
    it('sees an undo button appear', function() {
      this.retries(3);
      const {title, description, imageUrl} = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');

      browser.execute(function () {
        document.querySelectorAll('.delete-form')[0].submit();
      });

      assert.include(browser.getText('body'), 'Undo last delete');
    });

    it('undeletes deleted item', function() {
      this.retries(3);
      const {title, description, imageUrl} = buildItemObject();
      browser.url('/items/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');
      browser.execute(function () {
        document.querySelectorAll('.delete-form')[0].submit();
      });

      browser.click('#undo-button');

      assert.include(browser.getText('body'), title);
      assert.include(browser.getAttribute('.item-img', 'src'), imageUrl);
    });
  });
});

