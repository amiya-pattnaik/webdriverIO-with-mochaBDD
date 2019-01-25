### WebdriverIO-v5 boilerplate code with Mocha BDD

This repository contains a collection of sample webdriverIO (v5x) projects and libraries that demonstrate how to use the tool and develop automation script using the Mocha BDD framework. It support ES6 (via babel-register) and uses Grunt to manage tasks, provides utilities to read data from MS-Excel, executes SQL statements to any database(RDBMS such as Oracle, TeraData, MySQL, Vertica) for end to end testing. It generate Spec, JUNIT, Allure reporters as well.

💡 If you need the wdio-v4 boilerplate project, please take the code from v4 branch: click [here](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD/tree/wdio-v4)

### Installation
This project is tested on **Node v8.10.0**.  While earlier versions of node may be compatible, they have not been tested or verified.

`JDK 1.8:` Install JDK 1.8+ and make sure class path is set properly. JAVA is require to start `Selenium Server` nothing else.

`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. Recommended version is 8.10.0. OR  If you have nvm installed globally, you run `nvm install` to get the latest version of node specified in the`.nvmrc` file [here](/.nvmrc).  If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official [github page](https://github.com/creationix/nvm). MAC OSX users are best suited to install nvm with homebrew `brew install nvm`.

Now navigate to the framework's package.json folder and run `npm install` to grab all dependencies.

To take full advantage of the command line and use grunt tasks you will need to make sure that you have added `node_modules/.bin` to your `$PATH`.  Otherwise you will need to install the following globally:

  `npm install -g  grunt-cli`

### Selenium Tests / Appium Tests

  To run your test you must have selenium / Appium server up and running to execute any webdriverIO tests, or it will fail fast with an error. To start selenium automatically it has been added as part of `services: ['selenium-standalone']` in the .conf.js.  That's all there is to it.!.

### Run Some Sample Tests

To execute the entire test suite in local development, you can use any one of the options mentioned below

Option 1: `npm run test`

Option 2:  `grunt webdriver:test`.  This executes all features in the [`./test/specs/*.js`]  directory with a Spec reporter by default and references the `suite.yourSpecific.conf.js` file. Refer to the ./test/config of jasmine-bdd


💡 Before running mobile tests, perform the requisite Appium setup. For hassle free `one click Appium setup on OSX` refer [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) or refer [Appium Docs](http://appium.io/getting-started.html?lang=en)
### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files are found in the `/test/config/` directory and all end with `*.conf.js`.  These can be called via the the cli

### Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.  

##### Dot

To use the dot reporter just add 'dot' to the reporters array in the config file. The dot reporter prints for each test spec a dot. If colors are enabled on your machine you will see three different colors for dots. Yellow dots mean that at least one browser has executed that spec. A green dot means all browser passed that spec and a red to means that at least one browser failed that spec. All config files have this turned on by default.

##### Spec

Test reporter, that prints detailed results to console.

##### Allure

The Allure Reporter creates [Allure](http://allure.qatools.ru/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports.

To generate and view an allure report locally, run `npm run allure-report`. A typical Allure report will look like this

![ScreenShot](https://github.com/allure-framework/allure2/blob/master/.github/readme-img.png)

Allure has several other reporting tools optimized for the CI server of your choice.  You can [view the documentation here](http://wiki.qatools.ru/display/AL/Reporting).

Allure has several other reporting tools optimized for the CI server of your choice.  You can [view the documentation here](http://wiki.qatools.ru/display/AL/Reporting).

##### junit/xunit

TA WebdriverIO reporter that creates Jenkins compatible XML based JUnit reports. Add it to the reports array in the config file and define the directory where the xml files should get stored. webdriverIO will create an xml file for each instance under test and the filename will contain the browser and OS. Please note, this has been added in .config.

To generate and view an allure report locally, run `npm run junit-report`.

### Develop automation scripts (for both desktop browser and mobile browser / app)

You can write test by using Jasmine BDD framework. You can choose Mocha based design pattern or ES6 based. This project is ES6 friendly (via babel-register)

Refer complete [WebdriverIO v5 API](https://webdriver.io/docs/api.html) methods to write your automation tests.


#### Using Jasmine JavaScript framework

Tests are written in the Mocha framework. More about Jasmine can be found at https://mochajs.org/

Tests are place in `*.specs.js` files in the `/test/specs/` directory. A typical test will look similar to this:
```
//example.js
//a simple test using synchronous mode//

describe('WebdriverIO search', function() {

    it('searches for WebdriverIO', function() {
        browser.url('https://duckduckgo.com/');
        $('#search_form_input_homepage').setValue('WebdriverIO');
        $('#search_button_homepage').click();
        var title = browser.getTitle();
        console.log('Title is: ' + title);
    });
});

```
### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath') up to date with the latest version of your code.  The next challenge is to keep the code you write nice and [DRY] (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  Instead of including our selectors in our step definitions(in cucumber) or in Spec file (in Jasmine or Mocha), we instead place them in a `<pagename>.js` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern.  This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.js`.  These will require the basic `page.js` prototype construct / abstract class and create new objects for each individual page.

For more information on the implementation of `Page Object Design Pattern`, refer to the `/test/pageobjects` directory. A typical page class using ES6 syntax will look similar to this:

💡 If you want to use ES5 syntax, refer to the sample.page.js under util-examples.

```
import Page from './page';
class LoginPage extends Page {

    /**
    * define elements
    */

    get usernameInput()   { return $('//*[@name="username"]'); }
    get passwordInput()   { return $('//*[@name="password"]'); }
    get rememberMe ()     { return $('//*[@id="remember-me"]'); }
    get loginButton()     { return $('//button[contains(., "Login")]'); }

    /**
     * define or overwrite page methods
     */
    open () {
        super.open('login')
        //browser.pause(3000);
    }
    /**
     * your page specific methods
     */
    login (username, password) {
      this.usernameInput.setValue(username);
      this.passwordInput.setValue(password);
      this.rememberMe.click();
      this.loginButton.click();
    }
}

export default new LoginPage()

```

### Working with DataBase

A relational database is, simply, a database that stores related information across multiple tables and allows you to query information in more than one table at the same time. Your application under test displays data from these database. So when you are actually performing automation testing it is very likely that you need to verify the data between actual (which you got it from browser) Vs expected (which you will get it from the database by executing SQL statements on database). This can be done by below statements in your code.
```
//example of connection to Oracle DataBase

var  db   = require('node-any-jdbc');

cogfig = {
  libpath: './config/drivers/oracle/ojdbc7.jar',
  drivername: 'oracle.jdbc.driver.OracleDriver',
  url:  'jdbc:oracle:thin:QA/password123@//abc-test.corp.int:1527/stage1',
  // uri: 'jdbc:oracle:thin://abc-test.corp.int:1527/stage1',
  // user: 'QA',
  // password: 'password123',
};

//example of sample select query to fetch the result set

var sql = 'SELECT * FROM emp_info where emp_id = "1001"';
db.execute(cogfig, sql, function(results){
  console.log(results);
});

For trouble shooting and more information, please visit `node-any-jdbc` module which can be [found here](https://www.npmjs.com/package/node-any-jdbc)

Note: `node-any-jdbc` is NOT packaged under this project. If you need, you can install it and start using it right away. You can also find sample examples under /util-examples/database-example.js

```

### Working with MS-Excel

You can user MS-Excel and store your test data, expected data in an excel sheet. Tou can keeep any number of excel sheets you want and use below common methods to puull data from youe sheet to be use as part of testing.  Please note it only support .xlsx file format. For more information refer to the `common-utilities.js` and `util-examples`

```
//example of pulling data from MS-Excel

var  utl  = require('../utilities/common-utilities.js');
utl.excel_getTableRow(__dirname+'/sample.xlsx', 'info', 'emp_id', '101', function(results){
  // returns only one row based on the condition
  //console.log(results);
  //console.log(results.emp_id);
});

utl.excel_getTableRows(__dirname+'/sample.xlsx', 'address', function(results){
  // returns all rows of the specified sheet
  //console.log(results[1]);
  //then do what ever validation you to do withe results
});

utl.excel_getAllSheetData(__dirname+'/sample.xlsx', function(results){
  // returns all sheets data of a excel file
  //console.log(results);
  //then do what ever validation you to do withe results
});
```

### Common utilities

Refer to the common Javascript functions that provides clean, performant methods for manipulating objects, collections, MS-Excel utilities, DataBase utilities etc. Few sample code can be found in ./util-examples/

Use [Underscore.js](http://underscorejs.org/) already bundled inside the framework which provides over 100 functions that support both your favorite workaday functional helpers: map, filter, invoke — as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, and so on.

### Contribution

`Create a fork of the project into your own repository `. Make all your necessary changes and create a pull request with a description on what was added or removed and details explaining the changes in lines of code. If approved, project owners will merge it.

## History

Industry is moving towards Node.js / JavaScript, Angularjs, Full-Stack world. WebdriverIO, a JavaScript binding wrapper for Selenium Webdriver, was originated by Camilo Tapia's initial Selenium project called WebdriverJS, which was the first Webdriver project on NPM. In 2014, the project was renamed WebdriverIO later on. This repository is a pre-configured version of webdriverIO meant to jump-start the process of writing new test automation or adding test automation to existing node.js applications.


## Licensing

MIT
