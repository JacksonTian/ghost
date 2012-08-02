// var Page = require('./page.js');

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
  return client;
};

var Ghost = function (opts) {
  this.queue = [];
  this.scope = {};
  this.setPage(opts);
  this.started = false;
};

Ghost.prototype.set = function (key) {
  this[key] = function () {
    var callback, args;
    if (typeof arguments[arguments.length - 1] !== "function") {
      args = [].slice.call(arguments, 0, arguments.length);
      callback = function () {};
    } else {
      args = [].slice.call(arguments, 0, arguments.length - 1);
      callback = arguments[arguments.length - 1];
    }
    this.use(key, args, callback);
    return this;
  };
};

Ghost.prototype.setContext = function (value) {
  this.context = value;
  var whitelist = ["attr", "open", "text", "selectFrame", "go", "url", "hasClass", "click", "isVisible", "await", "val", "submit", "getTitle", "end", "saveScreenshot"];
  for (var key in value) {
    if (whitelist.indexOf(key) !== -1) {
      this.set(key);
    }
  }
};

Ghost.prototype.setPage = function (opts) {
  var page = new Page(opts);
  this.setContext(page);
};

Ghost.prototype.use = function (method, args, callback) {
  var that = this;

  var realMethod = (typeof method === "string") ? that.context[method] : method;
  if (typeof realMethod !== "function") {
    throw new Error("Not a function");
  }
  if (typeof args === "function") {
    callback = args;
    args = [];
  }

  args.push(function () {
    callback.apply(that.context, arguments);
    that.next();
  });

  // 放入队列中
  this.queue.push(function () {
    realMethod.apply(that.context, args);
  });

  // 启动
  if (!that.started) {
    that.started = true;
    that.next();
  }
  return this;
};

Ghost.prototype.next = function () {
  var next = this.queue.shift();
  if (next) {
    next();
  }
};

Ghost.prototype.done = function (callback) {
  var that = this;
  that.use(function (cb) {
    cb();
    that.started = false;
  }, callback);
  return that;
};

Ghost.prototype.when = function (next) {
  var that = this;
  that.use(function (cb) {
    cb();
  }, next);
  return that;
};

module.exports = Ghost;