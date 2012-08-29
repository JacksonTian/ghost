exports.command = function (id, cssProperyName, callback) {
  var commandOptions =  {
    path: "/session/:sessionId/element/:id/css/:propertyName",
    method: "GET"
  };

  commandOptions.path = commandOptions.path.replace(/:id/gi, id);
  commandOptions.path = commandOptions.path.replace(":propertyName", cssProperyName);
  
  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponse(callback), 
    data
  );
};
