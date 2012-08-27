exports.command = function (callback) {
  
  var commandOptions =  {
    path: "/session/:sessionId/window_handle",
    method: "GET"
  };

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponse(callback), 
    data
  );
};