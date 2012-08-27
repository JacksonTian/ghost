exports.command = function (callback) {
  var self = this;
  self._handle(function (result) {
    if (result.status === 0) {
      self._maximize(result.value, function () {
        callback();
      });
    } else {
      callback(result);
    }
  });
};
