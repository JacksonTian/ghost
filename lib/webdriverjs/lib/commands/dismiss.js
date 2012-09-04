exports.command = function (callback) {
  var self = this;

  self._dismiss(function (result) {
    if (result.status === 0) {
      callback(result.value);
    } else {
      callback(false);
    }
  });
};
