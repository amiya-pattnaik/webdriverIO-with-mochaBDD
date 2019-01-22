//to use debug option run `DEBUG=true followed by your .conf.js`
const defaultTimeoutInterval  = process.env.DEBUG ? (60 * 60 * 500) : 90000;

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',

    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `WebdriverIO` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
       './test/specs/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // './test/specs/file-to-exclude.js'
    ],

    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 15,

    capabilities: [
      {
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 Chrome instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': {
          // to run chrome headless the following flags are required
          // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
          // args: ['--headless', '--disable-gpu'],
        }
      },

      // {
      //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      //   // grid with only 5 firefox instances available you can make sure that not more than
      //   // 5 instances get started at a time.
      //   maxInstances: 5,
      //   browserName: 'firefox',
      //   "moz:firefoxOptions": {
      //     // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
      //     //args: ['-headless']
      //   }
      // },

      // {
      //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      //   // grid with only 5 Safari instances available you can make sure that not more than
      //   // 5 instances get started at a time.
      //   maxInstances: 5,
      //   browserName: 'safari',
      // },

      // {
      //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      //   // grid with only 5 IE instances available you can make sure that not more than
      //   // 5 instances get started at a time.
      //   maxInstances: 5,
      //   browserName: 'internet explorer',
      //   acceptUntrustedCertificates: true,
      //   ignoreProtectedModeSettings: true,    //only applicable to IE browser
      //   ignoreZoomSetting: true,              //only applicable to IE browser
      //   ensureCleanSession: true,
      // },
  ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    logLevel: 'silent',               // Level of logging verbosity: silent | verbose | command | data | result | error
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: 'http://www.phptravels.net',
    waitforTimeout: 10000,            // Default timeout for all waitFor* commands.
    connectionRetryTimeout: 90000,    // Default timeout in milliseconds for request if Selenium Grid doesn't send response
    connectionRetryCount: 3,          // Default request retries count

    services: ['selenium-standalone'],
    // services: [browserstack'],
    // user: process.env.BROWSERSTACK_USERNAME,
    // key: process.env.BROWSERSTACK_ACCESS_KEY,
    // browserstackLocal: true,

    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 90000,
      compilers: ['js:@babel/register'],
    },

    // reporters: ['spec', 'junit','allure', 'json', 'mochawesome'],
    // reporterOptions: {
    //     junit:  {outputDir:   './test/reports/junit-results/'},
    //     json:   {outputDir:   './test/reports/json-results/'},
    //     allure: {
    //       outputDir:   './test/reports/allure-results/',
    //       disableWebdriverStepsReporting: false,
    //       //useCucumberStepReporter: false,
    //     },
    //     mochawesome:  {outputDir:   './test/reports/mocha-results/'},
    //     mochawesomeOpts: {
    //       includeScreenshots: true,
    //       screenshotUseRelativePath:true
    //     },
    // },
    reporters: [
        'spec',
        ['junit', {
            outputDir: './test/reports/junit-results/',
            outputFileFormat: function(opts) { // optional
                return `results-${opts.cid}.${opts.capabilities}.xml`
            }
          }
        ],

        ['allure', {
            outputDir: './test/reports/allure-results/',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
          }
        ],
    ],

    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
      console.log('**** let\'s go ****');
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
        require('@babel/register');
    },
    /**
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    * @param {Array.<Object>} capabilities list of capabilities details
    * @param {Array.<String>} specs List of spec file paths that are to be run
    */
    before: function (capabilities, specs) {
      /**
       * Setup the Chai assertion framework
       */
      const chai    = require('chai');
      global.expect = chai.expect;
      global.assert = chai.assert;
      global.should = chai.should();
    },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeHook: function (each) {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function (currentTest) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // beforeTest: function (test) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    afterTest: function (test) {
      //console.log(test);
     },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. It is not
     * possible to defer the end of the process using a promise.
     * @param {Object} exitCode 0 - success, 1 - fail
     */
    onComplete: function(exitCode) {
      console.log('**** that\'s it ****');
    }
}
