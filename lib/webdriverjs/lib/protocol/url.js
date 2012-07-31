exports.command = function (callback) {
  var commandOptionsGet =  {
    path: "/session/:sessionId/url",
    method: "GET"
  };

  var self = this;
  var data;

  // get
  data = {};
  this.executeProtocolCommand(
    commandOptionsGet, 
    self.proxyResponse(callback), 
    data
  );

  return this;
};
