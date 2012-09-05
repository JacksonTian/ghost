exports.command = function (callback) {
  var commandOptions =  {
    path: "/session/:sessionId/accept_alert",
    method: "POST"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponseNoReturn(callback), 
    data
  );
};
