var webdriverjs = require('webdriverjs');
var client = webdriverjs.remote({
  desiredCapabilities: {browserName: "chrome"},
  logLevel: 'silent'
});
var should = require('chai').should();
var path = require('path');

var Ghost = function () {
  this.queeue = [];
  this.index = -1;
  
};


describe('Home', function () {
  var page;
  before(function () {
    page = client.init().url("http://shu.taobao.com/");
  });

  after(function (done) {
    client.end(done);
  });

  it('Title should be 淘宝指数 - 淘宝消费者数据研究平台', function (done) {
    page.getTitle(function (title) {
      title.should.be.equal("淘宝指数 - 淘宝消费者数据研究平台");
      done();
    });
  });

  it('start page should not visible', function (done) {
    page.isVisible("#startpage", function (isVisible) {
      isVisible.should.be.equal(false);
      page.saveScreenshot(path.join(__dirname, "../screenshot/screenshot_" + new Date().getTime() + ".png"), function (err) {
        done();
      });
    });
  });

  it('start button should be visible', function (done) {
    page.isVisible(".btn_start_index", function (isVisible) {
      isVisible.should.be.equal(true);
      done();
    });
  });
  
  it('start button should be visible', function (done) {
    page.click(".btn_start_index")
    .tests., function () {
      page.isVisible("#startpage", function (isVisible) {
        isVisible.should.be.equal(true);
      });
      page.isVisible(".btn_start_index", function (isVisible) {
        isVisible.should.be.equal(false);
      });
    });
  });

  
});
