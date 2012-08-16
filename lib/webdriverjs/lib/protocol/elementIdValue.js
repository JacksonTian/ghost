exports.command = function (id, value, callback) {

  var commandOptionsPost =  {
    path: "/session/:sessionId/element/:id/value",
    method: "POST"
  };

  var commandOptionsGet =  {
    path: "/session/:sessionId/element/:id/value",
    method: "GET"
  };

  var self = this;
  var data;

  // set
  if (typeof value === "string") {
    commandOptionsPost.path = commandOptionsPost.path.replace(/:id/gi, id);
    data = {"value": value.split("")};

    self.executeProtocolCommand(
      commandOptionsPost, 
      this.proxyResponseNoReturn(callback), 
      data
    );
  } else { // get
    callback = value;
    data = {};

    commandOptionsGet.path = commandOptionsGet.path.replace(/:id/gi, id);
    
    self.executeProtocolCommand(
      commandOptionsGet, 
      this.proxyResponse(callback), 
      data
    );
  }
  
};
