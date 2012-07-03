var Ghost = require('../lib/ghost.js');
var path = require('path');
var config = require('./config');

describe('Home', function () {
  var ghost;
  before(function () {
    ghost = new Ghost("http://github.com/", 
      {browser: config.browser, host: config.host, logLevel: config.logLevel});
  });

  after(function (done) {
    ghost.end(done);
  });

  it('Title should be "GitHub · Social Coding"', function (done) {
    ghost.getTitle(function (title) {
      title.should.be.equal('GitHub · Social Coding');
    })
    .done(done);
  });
});
