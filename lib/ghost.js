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
      args = [].slice.call(arguments, 0);
      callback = function () {};
    } else {
      args = [].slice.call(arguments, 0, -1);
      callback = arguments[arguments.length - 1];
    }
    this.use(key, args, callback);
    return this;
  };
};

Ghost.prototype.setContext = function (value) {
  this.context = value;
  var whitelist = ["status", "one", "all", "attr", "open", "text", "selectFrame",
    "go", "url", "hasClass", "click", "dblclick", "isVisible", "clear",
    "isSelected", "moveTo", "exists", "viewSource", "refresh", "maximize",
    "selectWindow", "close", "getWindows", "css", "engines", "getAlertText", "accept", "dismiss",
    "val", "submit", "getTitle", "end", "saveScreenshot"];

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
    // console.log(method + '执行完成，触发下一个任务');
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

Ghost.prototype.await = function (milliseconds, callback) {
  var that = this;
  callback = callback || function () {};
  that.queue.push(function () {
    // console.log("Waiting " + milliseconds + "ms.");
    setTimeout(function () {
      callback();
      // console.log("等待结束，触发下一个");
      that.next();
    }, milliseconds);
  });
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
  that.queue.push(function () {
    that.started = false;
    callback();
    // console.log("done结束，等待触发下一个");
  });
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