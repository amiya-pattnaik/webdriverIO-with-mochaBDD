import Page from './page.ts'

class LandingPage extends Page {

    /**
    * define elements
    */
    get accountMessage () { return $('//*[@class="subheader"]'); }


    /**
     * define or overwrite page methods
     */
    async open() {
        await super.open('http://www.phptravels.net/account')       //this will append `contact-us` to the baseUrl to form complete URL
        await browser.pause(2000);
    }

    async waitForLandingPageToLoad() {
      if(!(await this.accountMessage.isDisplayed())){
        await this.accountMessage.waitForDisplayed(5000);
      }
    }
    async getMessage() {
       return this.accountMessage.getText();
    }
}

export default new LandingPage();
