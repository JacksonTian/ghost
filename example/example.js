var Ghost = require('../lib/ghost.js');

var ghost = new Ghost("chrome", "http://www.google.com/");
ghost.setValue('input[name="q"]', "Cheese!", function () {
  console.log("set cheese!");
}).submitForm("#tsf", function () {
  console.log("submited");
});
