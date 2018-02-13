const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits single item page', () => {
  describe('posts a new item', () => {
    it('and sees it rendered', () => {
      const {title, description, imageUrl} = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');
      browser.click('.item-card a');

      assert.include(browser.getText('body'), description);
    });
  });
});
