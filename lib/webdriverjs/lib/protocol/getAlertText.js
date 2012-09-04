exports.command = function (callback) {
  var commandOptions =  {
    path: "/session/:sessionId/alert_text",
    method: "GET"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponse(callback), 
    data
  );
};
