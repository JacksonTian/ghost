// var webdriverjs = require('../lib/webdriverjs/lib/webdriverjs.js');

// var client = webdriverjs.remote({"desiredCapabilities": {"browserName": "chrome"}, host: "10.13.191.77"});
// // console.log(client);

// client.open(function () {
//   client.go("http://www.google.com/webhp?complete=1&hl=en", function () {
//     client.val('input[name="q"]', "Cheese!", function (value) {
//       client.submit("#tsf", function () {
//         client.await(1000, function () {
//           client.getTitle(function (title) {
//             console.log(title);
//           });
//         });
//       });
//     });
//   });
// });

var Ghost = require('../lib/ghost');

var ghost = new Ghost({browser: "chrome", host: "10.13.188.91"});
ghost.open()
.go("http://www.google.com/webhp?complete=1&hl=en")
.val('input[name="q"]', "Cheese!") // 输入Cheese!
.submit("#tsf") // 提交表单
.await(1000) // 暂停1秒，等待跳转
.getTitle(function (title) {
   console.log("Page title is: " + title); // 打印标题
});
