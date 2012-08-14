exports.command = function (callback) {
  var commandOptionsGet =  {
    path: "/session/:sessionId/url",
    method: "GET"
  };

  var data;

  // get
  data = {};
  this.executeProtocolCommand(
    commandOptionsGet, 
    this.proxyResponse(callback), 
    data
  );

  return this;
};
