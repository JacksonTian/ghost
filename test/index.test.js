var webdriverjs = require('webdriverjs');
var client = webdriverjs.remote({desiredCapabilities: {browserName: "chrome"}});
var should = require('chai').should();

describe('Home', function () {
  var page;
  before(function (done) {
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

});
