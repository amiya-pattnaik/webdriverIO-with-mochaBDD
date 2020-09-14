module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webdriver: {
            testsauce: {
                configFile: './test/config/wdio.sauce.conf.js'
            },
            testbrowserstack: {
                configFile: './test/config/wdio.browserstack.conf.js'
            },
            testlocal: {
                configFile: './test/config/wdio.local.conf.js'
            },
        },
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.registerTask('default', ['webdriver:testlocal']);
};
