const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits create page', () => {
  describe('posts a new item', () => {
    it('and sees it rendered', () => {
      const {title, description, imageUrl} = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), title);
      assert.include(browser.getAttribute('.item-img', 'src'), imageUrl);
    });
  });
});
