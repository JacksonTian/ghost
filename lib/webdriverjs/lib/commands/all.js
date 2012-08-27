exports.command = function (cssSelector, callback) {
  var self = this;
  self._elements("css selector", cssSelector, function (result) {
    if (result.status === 0) {
        callback(result.value);
    } else {
      callback(result);
    }
  });
};
