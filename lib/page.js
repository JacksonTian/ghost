var webdriverjs = require('./webdriverjs/lib/webdriverjs.js');

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
  client.init();
  return client;
};

module.exports = Page;
