var Page = require("../lib/page.js");
describe('Page', function () {
  it("should be chrome", function () {
    var page = Page("chrome", "http://shu.taobao.com/", {host: "10.13.191.77", logLevel: "silent"});
    page.desiredCapabilities.browserName.should.be.equal("chrome");
    page.end();
  });

  it("should be silent", function () {
    var page = Page("chrome", "http://shu.taobao.com/", {host: "10.13.191.77", logLevel: "silent"});
    page.logLevel.should.not.be.equal("silent");
    page.end();
  });
});
