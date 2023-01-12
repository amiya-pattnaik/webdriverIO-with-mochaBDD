import Page from './page.ts';
//import utl   from '../../utilities/common-utilities';

class LoginPage extends Page {

    /**
    * define elements
    */

    get usernameInput()   { return $('//*[@name="username"]'); }
    get passwordInput()   { return $('//*[@name="password"]'); }
    get loginButton()     { return $('//button[contains(., "Login")]'); }

    /**
     * define or overwrite page methods
     */
    async open() {
        await super.open('login')       //this will append `login` to the baseUrl to form complete URL
        //browser.pause(3000);
    }
    /**
     * your page specific methods
     */

    async waitForloginPageToLoad() {
      if(!(await this.headerImage.isDisplayed())){
        await this.headerImage.waitForDisplayed(10000);
      }
    }

    async login(username, password) {
      //this.waitForloginPageToLoad();
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.loginButton.click();
    }
}

export default new LoginPage()
