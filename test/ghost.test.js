var Ghost = require('../lib/ghost.js');

describe('Home', function () {
  var ghost;
  before(function () {
    ghost = new Ghost("chrome", "http://shu.taobao.com/", {host: "10.13.191.77", logLevel: "silent"});
  });

  after(function (done) {
    ghost.end(done);
  });

  it('Done should be ok', function (done) {
    var count = 0;
    ghost.done(function () {
      count++;
    });
    count.should.be.equal(1);
    done();
  });

  // it('start page should not visible', function (done) {
    // done();
  // });

  // it('start button should not be visible', function (done) {
    // done();
  // });
});
