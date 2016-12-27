module.exports = function (grunt) {
  var browsers = [{
    browserName: 'chrome',
    platform: 'Windows 10',
    version: '54'
  }, {
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '49'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11'
  }, {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '14'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '10'
  }];

  var buildId = '';
  if (process.env.TRAVIS_JOB_ID) {
    buildId += process.env.TRAVIS_JOB_ID;
  }
  buildId += '-' + Math.floor(Math.random() * 1000);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },

    'saucelabs-mocha': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/test_runner/index.html'
          ],
          browsers: browsers,
          build: buildId,
          testname: 'mocha tests',
          throttled: 2,
          statusCheckAttempts: 90,
          pollInterval: 4000,
          sauceConfig: {
            'video-upload-on-pass': false,
            'idle-timeout': 180
          }
        }
      }
    },
    watch: {}
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('default', ['connect', 'saucelabs-mocha']);
};