exports.command = function (id, callback) {
  
  var commandOptions =  {
    path: "/session/:sessionId/element/:id/displayed",
    method: "GET"
  };

  commandOptions.path = commandOptions.path.replace(/:id/gi, id);
  
  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponse(callback), 
    data
  );
};
