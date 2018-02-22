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

    it('and edits the title', () => {
      const {title, description, imageUrl} = buildItemObject();
      const newTitle = 'Another title for this';
      browser.url('/items/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');
      browser.click('.item-card a');

      browser.click('.update-button');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');
      browser.click('.item-card a');

      assert.include(browser.getText('#item-title'), newTitle);
      assert.include(browser.getText('#item-description'), description);
    });
  });
});
