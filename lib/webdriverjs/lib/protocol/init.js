exports.command = function(desiredCapabilities, callback) {
  var self = this;

  var commandOptions =  {
    path: "/session",
    method: "POST"
  };

  if (typeof desiredCapabilities === "function") {
    callback = desiredCapabilities;
    desiredCapabilities = {};
  }

  desiredCapabilities = desiredCapabilities || {};
  callback = callback || function () {};

  self.desiredCapabilities = self.extend(self.desiredCapabilities, desiredCapabilities);
  if (desiredCapabilities.sessionId) {
    self.sessionId = desiredCapabilities.sessionId;
  }

  var data = {desiredCapabilities: self.desiredCapabilities, sessionId: null};

  this.executeProtocolCommand(
    commandOptions, 
    self.proxyResponse(callback, {setSessionId: true}), 
    data
  );
  return this;
};
