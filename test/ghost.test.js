/*!
 * ghost - test/ghost.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('./config');
var Ghost = require('../lib/ghost.js');

describe('Home', function () {
  var ghost;
  before(function () {
    ghost = new Ghost("http://www.google.com/webhp?complete=1&hl=en", 
      {browser: config.browser, host: config.host, logLevel: config.logLevel});
  });

  after(function (done) {
    ghost.end(done);
  });

  it('should search "Cheese" success', function (done) {
    ghost.setValue('input[name="q"]', "Cheese!")
    .submitForm("#tsf")
    .pause(2000)
    .getTitle(function (title) {
      console.log("Page title is: " + title);
      title.should.include('Cheese');
    })
    .done(done);
  });

  it('Done should be ok', function (done) {
    var count = 0;
    ghost.done(function () {
      count++;
    });
    count.should.be.equal(1);
    done();
  });
});
