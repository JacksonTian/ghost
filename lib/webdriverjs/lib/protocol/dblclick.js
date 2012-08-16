exports.command = function (callback) {
  var commandOptions =  {
    path: "/session/:sessionId/doubleclick",
    method: "POST"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponseNoReturn(callback), 
    data
  );
};
