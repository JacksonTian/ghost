exports.command = function (callback) {
  
  var commandOptions =  {
    path: "/session/:sessionId/window",
    method: "DELETE"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponseNoReturn(callback), 
    data
  );
};