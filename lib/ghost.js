var Ghost = function (context) {
  this.queue = [];
  this.context = context;
  this.started = false;
};

Ghost.prototype.setContext = function (value) {
  this.context = value;
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

module.exports = Ghost;