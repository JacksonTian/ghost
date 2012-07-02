var Page = require('../lib/page.js');

var Ghost = function (browser, url) {
  this.queue = [];
  this.setPage(browser, url);
  this.started = false;
};

Ghost.prototype.set = function (key) {
  this[key] = function () {
    var args = [].slice.call(arguments, 0, arguments.length - 1);
    var callback = arguments[arguments.length - 1] || function () {};
    this.use(key, args, callback);
    return this;
  };
};

Ghost.prototype.setContext = function (value) {
  this.context = value;
  var whitelist = ["click", "isVisible", "pause", "getText", "setValue", "submitForm", "getTitle"];
  for (var key in value) {
    if (whitelist.indexOf(key) !== -1) {
      this.set(key);
    }
  }
};

Ghost.prototype.setPage = function (browser, url) {
  var page = new Page(browser);
  page.url(url);
  this.setContext(page);
};

Ghost.prototype.use = function (method, args, callback) {
  var that = this;
  if (!that.queue.length) {
    that.started = false;
  }

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
  this.use(function () {}, [], callback);
};

module.exports = Ghost;