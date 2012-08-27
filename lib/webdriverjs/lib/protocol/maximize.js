exports.command = function (windowHandle, callback) {
  var commandOptions =  {
    path: "/session/:sessionId/window/:windowHandle/maximize",
    method: "POST"
  };

  commandOptions.path = commandOptions.path.replace(":windowHandle", windowHandle);

  var data = {"name": windowHandle};

  this.executeProtocolCommand(
    commandOptions,
    this.proxyResponse(callback), 
    data
  );
};