
import loginPage    from '../pageobjects/herokuapp-login.page';
import landingPage  from '../pageobjects/herokuapp-landing.page';
import assert       from 'assert';

/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('Test for herokuapp login page', function() {
  it('should allow user to login ', function () {
    loginPage.open();     // navigating to login page
    loginPage.login('tomsmith', 'SuperSecretPassword!');    // entering user name, password and and submiting the page
  });

  it('should validate the message after login ', function () {
    assert.equal(landingPage.getMessage(), "Welcome to the Secure Area. When you are done click logout below.");
  });
});
