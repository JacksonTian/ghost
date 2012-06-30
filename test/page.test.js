var Page = require("../lib/page.js");
describe('Page', function () {
  it("should be chrome", function () {
    var page = Page("chrome", "http://www.google.com/");
    page.desiredCapabilities.browserName.should.be.equal("chrome");
  })
});