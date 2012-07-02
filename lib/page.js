var webdriverjs = require('webdriverjs');

var Page = function (opts) {
  var options = {};

  opts = opts || {};
  if (opts.browser) {
    opts.desiredCapabilities = {browserName: opts.browser};
    delete opts.browser;
  }

  for (var key in opts) {
    options[key] = opts[key];
  }
  var client = webdriverjs.remote(options);
  return client.init();
};

module.exports = Page;
