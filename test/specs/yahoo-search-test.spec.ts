
import yahooPage    from '../pageobjects/yahoo-search.page.ts';
import assert       from 'assert';

/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('Performing a search operation on Yahoo Page',  () =>  {
  it('Performing a search operation', async () =>  {
    await yahooPage.open();
    assert.equal(await browser.getTitle(), 'Yahoo Search - Web Search');
  });

  it('searching Selenium Webdriver', async () =>  {
    await yahooPage.enterText('Selenium Webdriver');
    yahooPage.search();
    assert.equal(await yahooPage.isSearched(), true);
  });
});
