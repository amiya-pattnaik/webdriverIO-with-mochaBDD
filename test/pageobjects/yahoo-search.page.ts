
import Page from './page.ts';

class YahooPage extends Page  {
  /**
  * define elements
  */
  get searchInput()   { return $('#yschsp'); }
  get searchButton()  { return $('.mag-glass'); }
  get resultsList()   { return $('#results'); }

  /**
   * define or overwrite page methods
   */

  async open() {
      await super.open('https://search.yahoo.com')       //provide your additional URL if any. this will append to the baseUrl to form complete URL
      await browser.pause(1000);
  }

  async enterText(item) {
    await this.searchInput.clearValue();
    await this.searchInput.setValue(item);
    await browser.pause(1000);
  }

  async search() {
    await this.searchButton.click();
  }
  async isSearched() {
    await this.resultsList.waitForDisplayed(1000);
    return this.resultsList.isDisplayed();
  }
}

export default new YahooPage();
