// this is my take on a client for the webdriver
// its totally inspired by jellyfishs webdriver, but my goal is to make all the webdriver protocol items available, as near the original as possible

var http = require("http");
var fs = require('fs');
var path = require('path');
var infoHasBeenShown = false;

// useful colors for bash
var colors = {
  black: "\x1b[0;30m",
  dkgray: "\x1b[1;30m",
  brick: "\x1b[0;31m",
  red: "\x1b[1;31m",
  green: "\x1b[0;32m",
  lime: "\x1b[1;32m",
  brown: "\x1b[0;33m",
  yellow: "\x1b[1;33m",
  navy: "\x1b[0;34m",
  blue: "\x1b[1;34m",
  violet: "\x1b[0;35m",
  magenta: "\x1b[1;35m",
  teal: "\x1b[0;36m",
  cyan: "\x1b[1;36m",
  ltgray: "\x1b[0;37m",
  white: "\x1b[1;37m",
  reset: "\x1b[0m"
};

var errorCodes = {
  "-1": {id: "Unknown", message:  "Remote end send an unknown status code."},
  "0": {id: "Success", message:   "The command executed successfully."},
  "7": {id: "NoSuchElement", message: "An element could not be located on the page using the given search parameters."},
  "8": {id: "NoSuchFrame", message: "A request to switch to a frame could not be satisfied because the frame could not be found."},
  "9": {id: "UnknownCommand", message: "The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource."},
  "10": {id: "StaleElementReference", message: "An element command failed because the referenced element is no longer attached to the DOM."},
  "11": {id: "ElementNotVisible", message: "An element command could not be completed because the element is not visible on the page."},
  "12": {id: "InvalidElementState", message: "An element command could not be completed because the element is in an invalid state (e.g. attempting to click a disabled element)."},
  "13": {id: "UnknownError", message: "An unknown server-side error occurred while processing the command."},
  "15": {id: "ElementIsNotSelectable", message: "An attempt was made to select an element that cannot be selected."},
  "17": {id: "JavaScriptError", message: "An error occurred while executing user supplied JavaScript."},
  "19": {id: "XPathLookupError", message: "An error occurred while searching for an element by XPath."},
  "23": {id: "NoSuchWindow", message: "A request to switch to a different window could not be satisfied because the window could not be found."},
  "24": {id: "InvalidCookieDomain", message: "An illegal attempt was made to set a cookie under a different domain than the current page."},
  "25": {id: "UnableToSetCookie", message: "A request to set a cookie's value could not be satisfied."},
  "26": {id: "UnexpectedAlertOpen", message: "A modal dialog was open, blocking this operation"},
  "27": {id: "NoAlertOpenError", message: "An attempt was made to operate on a modal dialog when one was not open."},
  "28": {id: "ScriptTimeout", message: "A script did not complete before its timeout expired."},
  "29": {id: "InvalidElementCoordinates", message: "The coordinates provided to an interactions operation are invalid."},
  "30": {id: "IMENotAvailable", message: "IME was not available."},
  "31": {id : "IMEEngineActivationFailed", message: "An IME engine could not be started."},
  "32": {id: "InvalidSelector", message: "Argument was an invalid selector (e.g. XPath/CSS)."},
  "34": {id: "ElementNotScrollable", message: "Element cannot be scrolled into view."}
};

//options host, port, username, pass
var WebdriverJs = function (options) {
  var self = this;

  options = options || {};
  self.options = options;
  self.sessionId = null;

  /* log level
   * silent : no logs
   * command : command only
   * verbose : command + data
   */
  self.logLevel = options.logLevel || 'verbose';

  // where to save the screenshots. default to current folder
  self.screenshotPath = "";

  self.desiredCapabilities = {
      browserName: "firefox",
      version: "",
      javascriptEnabled: true,
      platform: "ANY"
  };

  if (options.desiredCapabilities) {
    self.desiredCapabilities = self.extend(self.desiredCapabilities, options.desiredCapabilities);
  }
  if (options && options.username && options.accessKey) {
    self._authString = options.username + ":" + options.accessKey;
  }

  if (self.logLevel !== 'silent' && !infoHasBeenShown)
  {
      console.log("");
      console.log(colors.yellow + "=====================================================================================" + colors.reset);
      console.log("");
      console.log("Selenium 2.0/webdriver protocol bindings implementation with helper commands in nodejs by Camilo Tapia.");
      console.log("For a complete list of commands, visit " + colors.lime + "http://code.google.com/p/selenium/wiki/JsonWireProtocol" + colors.reset + ". ");
      console.log("Not all commands are implemented yet. visit " + colors.lime + "https://github.com/Camme/webdriverjs" + colors.reset + " for more info on webdriverjs. ");
      //Start with " + colors.lime + "-h option" + colors.reset + " to get a list of all commands.");
      console.log("");
      console.log(colors.yellow + "=====================================================================================" + colors.reset);
      console.log("");
      
      infoHasBeenShown = true;
  }

  // expose protocol with correct context
  this.loadFolder("_", __dirname + "/protocol/");
  // create queue commands for the protocol
  this.loadFolder("", __dirname + "/commands/");
};

// create a set of request options
WebdriverJs.prototype.createOptions = function (requestOptions) {
  var options = this.options;
  var defaultOptions = {
    host: options.host || 'localhost',
    port: options.port || 4444,
    method: 'POST'
  };
  var newOptions = this.extend(defaultOptions, requestOptions);

  var path = '/wd/hub';

  if (this.sessionId) {
    newOptions.path = newOptions.path.replace(':sessionId', this.sessionId);
  }

  if (newOptions.path && newOptions.path !== "") {
    path += newOptions.path;
  }

  newOptions.path = path;

  return newOptions;
};

WebdriverJs.prototype.setScreenshotPath = function (pathToSaveTo) {
  this.screenshotPath = pathToSaveTo;
  return this;
};

// this funciton is an entry point for adding new commands
WebdriverJs.prototype.addCommand = function (prefix, commandName, command) {
  if (this[prefix + commandName]) {
    throw new Error("The command '" + prefix + commandName + "' is already defined!");
  }

  this[prefix + commandName] = command;
  return this;
};

//  send the protocol command to the webdriver server
WebdriverJs.prototype.executeProtocolCommand = function (requestOptions, callback, data) {
  var request = this.createRequest(requestOptions, data, callback);
  var stringData = JSON.stringify(data);

  if (this.logLevel === 'verbose' && stringData !== "{}") {
    this.log(colors.brown + "DATA\t\t " + colors.reset + stringData);
  }

  request.write(stringData);
  request.end();
};

// a basic extend method
WebdriverJs.prototype.extend = function (base, obj) {
  var newObj = {};
  for(var prop1 in base)
  {
      newObj[prop1] = base[prop1];
  }
  for(var prop2 in obj)
  {
      newObj[prop2] = obj[prop2];
  }
  return newObj;
};

WebdriverJs.prototype.testMode = function () {
  this.log(colors.yellow + "NOW IN TEST MODE!" + colors.reset + "\n");
  this.logLevel = 'silent';
  return this;
};

WebdriverJs.prototype.silent = function () {
  this.logLevel = 'silent';
  return this;
};

// strip the content from unwanted characters
WebdriverJs.prototype.strip = function (str) {
  var x = [],
    i = 0,
    il = str.length;

  for (i; i < il; i++) {
    if (str.charCodeAt(i)) {
      x.push(str.charAt(i));
    }
  }

  return x.join('');
};

// A log helper with fancy colors
WebdriverJs.prototype.log = function (message, content) {
  if (this.logLevel !== 'verbose') {
    return false;
  }

  var currentDate = new Date();
  var dateString = currentDate.toString().match(/\d\d:\d\d:\d\d/)[0]; 

  if (!content) {
    console.log(colors.dkgray + "[" + dateString + "]: " + colors.reset, message);
  } else {
    console.log(colors.dkgray +"[" + dateString + "]: " + colors.reset, message, "\t", JSON.stringify(content));
  }
};

// a helper function to create a callback that doesnt return anything
WebdriverJs.prototype.proxyResponseNoReturn = function (callback) {
  return function (response) {
    if (callback) { 
      callback();
    }
  };
};

WebdriverJs.prototype.createRequest = function (requestOptions, data, callback) {
  if (typeof data === "function") {
      callback = data;
      data = "";
  }

  var fullRequestOptions = this.createOptions(requestOptions);

  this.log(colors.violet + "COMMAND\t" + colors.reset + fullRequestOptions.method, fullRequestOptions.path);
  
  fullRequestOptions.headers = {
    'content-type': 'application/json',
    'charset': 'charset=UTF-8'
  };

  if(this._authString){
      var buf = new Buffer(this._authString);
      fullRequestOptions.headers.Authorization = 'Basic '+ buf.toString('base64');
  }
  
  // we need to set the requests content-length. either from the data that is sent or 0 if nothing is sent
  if (data !== "") {
    fullRequestOptions.headers['content-length'] = JSON.stringify(data).length;
  } else {
    fullRequestOptions.headers['content-length'] = 0;
  }

  var request = http.request(fullRequestOptions, callback);
  
  var self = this;
  request.on("error", function(err) {
    self.log(colors.red + "ERROR ON REQUEST" + colors.reset);
    console.log(colors.red, err, colors.reset);
  });

  return request;
};

// a helper function to create a callback that parses and checks the result
WebdriverJs.prototype.proxyResponse = function (callback, options) {

  var self = this;
  var baseOptions = {saveScreenshotOnError: true};
  return function (response) {
    response.setEncoding('utf8');
    var data = "";
    response.on('data', function (chunk) {
      data += chunk.toString();
    });

    response.on('end', function () {
      if (options && options.setSessionId) {
        try {
          var locationList = response.headers.location.split("/");
          var sessionId = locationList[locationList.length - 1];
          self.sessionId = sessionId;
          self.log("SET SESSION ID ", sessionId);
        } catch(err) {
          self.log(colors.red + "COULDNT GET A SESSION ID" + colors.reset);
        }
      }

      var result;

      try {
        result = JSON.parse(self.strip(data));
      } catch (err) {
        if (data !== "") {
            self.log("/n" + colors.red + err + colors.reset + "/n");
            self.log(colors.dkgrey + data + colors.reset + "/n");
        }
        result = {value: -1};

        if (callback) {
          callback(result);
        }

        return;
      }

      if (result.status === 0) {
        self.log(colors.teal + "RESULT\t"  + colors.reset, result.value);
      } else if (result.status === 7) {
        result = {value: -1, status: result.status, orgStatus: result.status, orgStatusMessage: errorCodes[result.status].message};
        self.log(colors.teal + "RESULT\t"  + colors.reset, errorCodes[result.status].id);
      } else if (result.status === 11) {
        result = {value: -1, error: errorCodes[result.status].id, status: result.status, orgStatus: result.status, orgStatusMessage: errorCodes[result.status].message};
        self.log(colors.teal + "RESULT\t"  + colors.reset, errorCodes[result.status].id);
      } else {
        // remove the content of the screenshot temporarily so that cthe consle output isnt flooded
        var screenshotContent = result.value.screen;
        delete result.value.screen;
        if (errorCodes[result.status]) {
          self.log(colors.red + "ERROR\t"  + colors.reset + "" + errorCodes[result.status].id + "\t" + errorCodes[result.status].message);
        } else {
          self.log(colors.red + "ERROR\t"  + colors.reset + "\t", result + "\t" + errorCodes["-1"].message);
        }

        try {
          var jsonData = JSON.parse(self.strip(data));
          self.log("\t\t" + jsonData.value.message);
        } catch (err) {
          self.log("\t\t" + data);
        }

        // add the screenshot again
        result.value.screen = screenshotContent;
        if (process.argv.length > 1) {

          var runner = process.argv[1].replace(/\.js/gi, "");
          var prePath = "";

          if (self.screenshotPath === "") {
            prePath = runner;
          } else {
            prePath = self.screenshotPath + runner.substring(runner.lastIndexOf("/") + 1);
          }

          // dont save the screenshot if its an unknown error
          if (result.status !== 13) {
            var errorScreenshotFileName = prePath + "-ERROR.AT." + self.currentQueueItem.commandName + ".png";
            self.log(colors.red + "SAVING SCREENSHOT WITH FILENAME:" + colors.reset);
            self.log(colors.brown + errorScreenshotFileName + colors.reset);
              self.saveScreenshotToFile(errorScreenshotFileName, result.value.screen);
          }
        }
      }
          
      if (!self.sessionId) {
        self.log(colors.red + "NO SESSION, EXITING" + colors.reset);
        process.exit(1);
      }

      if (callback) {
        // console.log("run callback for protocol")
        callback(result);
      }
    });
  };
};

WebdriverJs.prototype.saveScreenshotToFile = function (fileName, data) {
  fs.writeFile(fileName, data, "base64", function(err) {
    if (err) {
      this.log(err);
    }
  });
};

WebdriverJs.prototype.loadFolder = function (prefix, folder) {
  // the acutal commands. read them dynamicaly
  var files = fs.readdirSync(folder);

  for(var i = 0, ii = files.length; i < ii; i++) {
    if (path.extname(files[i]) === ".js") {
      var commandName = path.basename(files[i], '.js');
      this.addCommand(prefix, commandName, require(folder + files[i]).command);
    }
  }
};

var singletonInstance = null;

// expose the man function
// if we need a singleton, we provide the option here
// host, port, username, pass
exports.remote = function (options) {
  // make sure we have a default options if none are provided
  options = options || {};
  
  if (options.singleton) {
    if (!singletonInstance) {
      singletonInstance = new WebdriverJs(options);
    }
    return singletonInstance;
  } else {
    return new WebdriverJs(options);//host, port, username, pass);
  }
};
