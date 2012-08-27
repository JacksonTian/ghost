exports.command = function (id, callback) {
  var commandOptions =  {
    path: "/session/:sessionId/element/:id/location_in_view",
    method: "GET"
  };
  commandOptions.path = commandOptions.path.replace(/:id/gi, id);
  
  var request = this.createRequest(commandOptions, this.proxyResponse(callback));
  var data = JSON.stringify({});
  request.write(data);
  request.end();
};
