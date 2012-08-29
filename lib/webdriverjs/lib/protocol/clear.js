exports.command = function (id, callback) {

  var commandOptionsPost =  {
    path: "/session/:sessionId/element/:id/clear",
    method: "POST"
  };

  var self = this;

  var requestOptions = commandOptionsPost;
  commandOptionsPost.path = commandOptionsPost.path.replace(/:id/gi, id);
    
  var data = {};

  self.executeProtocolCommand(
    commandOptionsPost, 
    this.proxyResponseNoReturn(callback), 
    data
  );
  
};
