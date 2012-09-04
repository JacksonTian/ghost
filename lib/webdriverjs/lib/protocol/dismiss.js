exports.command = function (callback) {
  var commandOptions =  {
    path: "/session/:sessionId/dismiss_text",
    method: "POST"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponseNoReturn(callback), 
    data
  );
};
