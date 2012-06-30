var webdriverjs = require('webdriverjs');

var Page = function (browser, opts) {
  var options = {
    desiredCapabilities: {browserName: browser},
    logLevel: 'silent'
  };

  opts = opts || {};
  for (var key in opts) {
    options[key] = opts[key];
  }
  var client = webdriverjs.remote(options);
  return client.init();
};

module.exports = Page;
