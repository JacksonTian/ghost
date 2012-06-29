var webdriverjs = require('webdriverjs');

var Page = function (browser) {
  var client = webdriverjs.remote({
    desiredCapabilities: {browserName: browser},
    logLevel: 'silent'
  });
  return client.init();
};

module.exports = Page;