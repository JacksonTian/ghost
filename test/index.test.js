var webdriverjs = require('webdriverjs');
var Ghost = require('../lib/ghost.js');
var client = webdriverjs.remote({
  desiredCapabilities: {browserName: "chrome"},
  logLevel: 'silent'
});

var path = require('path');

describe('Home', function () {
  var ghost = new Ghost();
  before(function () {
    var page = client.init().url("http://shu.taobao.com/");
    ghost.setContext(page);
  });

  after(function () {
    ghost.use('end', function () {
      console.log("close");
    });
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

  it('start button should not be visible', function (done) {
    ghost.use("click", [".btn_start_index"], function () {})
    .use("isVisible", ["#startpage"], function (isVisible) {
      isVisible.should.be.equal(true);
    })
    .use("isVisible", [".btn_start_index"], function (isVisible) {
      console.log("btn_start_index");
      isVisible.should.be.equal(false);
      done();
    });
  });

  
});
