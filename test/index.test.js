var Ghost = require('../lib/ghost.js');
var path = require('path');

describe('Home', function () {
  var ghost;
  before(function () {
    ghost = new Ghost("Chrome", "http://shu.taobao.com/");
  });

  after(function (done) {
    ghost.end(done);
  });

  it('Title should be 淘宝指数 - 淘宝消费者数据研究平台', function (done) {
    ghost.getTitle(function (title) {
      title.should.be.equal("淘宝指数 - 淘宝消费者数据研究平台");
      done();
    });
  });

  it('start page should not visible', function (done) {
    ghost.isVisible("#startpage", function (isVisible) {
      isVisible.should.be.equal(false);
    });
    var tmp = path.join(__dirname, "../screenshot/screenshot_" + new Date().getTime() + ".png");
    ghost.saveScreenshot(tmp, function () {
      done();
    });
  });

  it('start button should not be visible', function (done) {
    ghost.isVisible(".btn_start_index", function (isVisible) {
      isVisible.should.be.equal(true);
    })
    .click("img.btn_start_index", function () {})
    .pause(2000, function (){})
    .isVisible("#startpage", function (isVisible) {
      isVisible.should.be.equal(true);
    })
    .isVisible(".btn_start_index", function (isVisible) {
      isVisible.should.be.equal(false);
      done();
    });
  });
});
