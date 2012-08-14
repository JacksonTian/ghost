exports.command = function (id, attributeName, callback) {
  var commandOptions =  {
    path: "/session/:sessionId/element/:id/attribute/:name",
    method: "GET"
  };

  commandOptions.path = commandOptions.path.replace(/:id/gi, id).replace(":name", attributeName);

  var data = {};

  this.executeProtocolCommand(
    commandOptions, 
    this.proxyResponse(callback), 
    data
  );
};
