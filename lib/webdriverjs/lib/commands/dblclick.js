exports.command = function (cssSelector, callback) {
  var self = this;

  self.moveTo(cssSelector, function () {
    self._element("css selector", cssSelector, function (result) {
      if (result.status === 0) {
        self._dblclick(function (result) {
          callback();
        });
      } else {
        callback(result);
      }
    });
  });
};
