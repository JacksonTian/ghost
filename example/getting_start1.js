var Ghost = require('../lib/ghost.js');
// var Ghost = require('webghost');

var ghost = new Ghost("http://www.google.com/webhp?complete=1&hl=en", {host: "10.13.191.77", browser: "chrome"});
ghost.setValue('input[name="q"]', "Cheese!") // 输入Cheese!
.submitForm("#tsf") // 提交表单
.pause(1000) // 暂停1秒，等待跳转
.getTitle(function (title) {
  console.log("Page title is: " + title); // 打印标题
});
