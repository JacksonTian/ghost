exports.command = function (callback) {
  var commandOptions =  {
    path: "/session/:sessionId/accept_text",
    method: "POST"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponseNoReturn(callback), 
    data
  );
};
