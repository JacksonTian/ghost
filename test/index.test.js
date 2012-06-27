var webdriverjs = require('webdriverjs');
var client = webdriverjs.remote({
  desiredCapabilities: {browserName: "chrome"},
  logLevel: 'silent'
});
var should = require('chai').should();
var path = require('path');

var Ghost = function (context) {
  this.queeue = [];
  this.context = context;
  this.started = false;
};
Ghost.prototype.setContext = function (value) {
  this.context = value;
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
  this.queeue.push(function () {
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
  var next = this.queeue.shift();
  if (next) {
    next();
  }
};

describe('Home', function () {
  var ghost = new Ghost();
  before(function () {
    var page = client.init().url("http://shu.taobao.com/");
    ghost.setContext(page);
  });

  after(function (done) {
    client.end(done);
  });

  it('Title should be 淘宝指数 - 淘宝消费者数据研究平台', function (done) {
    ghost.use("getTitle", function (title) {
      title.should.be.equal("淘宝指数 - 淘宝消费者数据研究平台");
      done();
    });
  });

  it('start page should not visible', function (done) {
    ghost.use("isVisible", ["#startpage"], function (isVisible) {
      isVisible.should.be.equal(false);
    });
    var tmp = path.join(__dirname, "../screenshot/screenshot_" + new Date().getTime() + ".png");
    ghost.use("saveScreenshot", [tmp], function () {
      done();
    });
  });

  it('start button should be visible', function (done) {
    ghost.use("isVisible", [".btn_start_index"], function (isVisible) {
      isVisible.should.be.equal(true);
      done();
    });
  });

  // it('start button should be visible', function (done) {
  //   page.click(".btn_start_index")
  //   .tests., function () {
  //     page.isVisible("#startpage", function (isVisible) {
  //       isVisible.should.be.equal(true);
  //     });
  //     page.isVisible(".btn_start_index", function (isVisible) {
  //       isVisible.should.be.equal(false);
  //     });
  //   });
  // });

  
});
