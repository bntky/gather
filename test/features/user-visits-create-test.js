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

    it('and then deletes the item', function() {
      this.retries(3);
      const {title, description, imageUrl} = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');

      // No submit button for delete form and Javascript to set up
      // onclick event in browser not run in test suite.  So, the
      // following is the equivalent of document.click('.delete-form').
      // Please suggest a better solution if there is one.
      browser.execute(function () {
        document.querySelectorAll('.delete-form')[0].submit();
      });

      assert.notInclude(browser.getText('body'), title);
    });
  });
});
