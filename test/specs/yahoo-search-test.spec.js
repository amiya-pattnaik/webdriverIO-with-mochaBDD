
import yahooPage    from '../pageobjects/yahoo-search.page';
import assert       from 'assert';

/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('Performing a search operation on Yahoo Page', function() {
  it('Performing a search operation', function () {
    yahooPage.open();
    assert.equal(browser.getTitle(), 'Yahoo Search - Web Search');
  });

  it('searching Selenium Webdriver', function () {
    yahooPage.enterText('Selenium Webdriver');
    yahooPage.search();
    assert.equal(yahooPage.isSearched(), true);
  });
});
