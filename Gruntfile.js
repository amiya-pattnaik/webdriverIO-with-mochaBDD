module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webdriver: {
            test: {
                configFile: './test/config/suite.mocha.conf.js'
            },
            // test-mobile: {
            //     configFile: './test/config/suite.appium.conf.js'
            // },
        },
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.registerTask('default', ['webdriver:test']);
    //grunt.registerTask('default', ['webdriver:test-mobile']);
};
