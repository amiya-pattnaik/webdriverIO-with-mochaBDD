
import contactUs from '../pageobjects/ta-contactus.page';
import assert from 'assert';

/*
	This is a BDD test using Mocha JavaScript framework
*/

describe('navigating to contact-us page', function() {
  it('should allow user to navigating contact-us page ', function () {
    contactUs.open();     // navigating to login page
    contactUs.waitForContactPageToLoad();
    console.log(contactUs.getPageTitle());
    //expect(contactUs.getPageTitle()).to.equal('Contact Us');
    assert.equal(contactUs.getPageTitle(), 'Contact Us');

  });
});
