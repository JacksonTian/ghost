exports.command = function (callback) {
  var commandOptions =  {
    path: "/session/:sessionId/ime/available_engines",
    method: "GET"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponse(callback), 
    data
  );
};
