exports.command = function (url, callback) {
  var commandOptionsPost =  {
    path: "/session/:sessionId/url",
    method: "POST"
  };

  var self = this;
  var data;

  //  request = this.createRequest(this.createOptions(commandOptionsPost), this.proxyResponseNoReturn(callback));
  data = {"url": url};
  this.executeProtocolCommand(
    commandOptionsPost, 
    self.proxyResponseNoReturn(callback), 
    data
  );

  return this;
};
