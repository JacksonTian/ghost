var http = require("http");

exports.command = function(frameId, callback) 
{
	
	var commandOptions =  {
		path: "/session/:sessionId/frame",
		method: "POST"
	};
	var data;
	if (arguments.length === 1) {
		callback = frameId;
		frameId = null;
		data = {};
	}
	
	data = {"id": frameId};
	
	this.executeProtocolCommand(
		commandOptions, 
		this.proxyResponseNoReturn(callback), 
		data
	);
};