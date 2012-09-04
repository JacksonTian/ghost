exports.command = function (callback) {
  var self = this;

  self._availableEngines(function(result) {
    if (result.status === 0) {
      callback(result);
    } else {
      callback(result);
    }
  });
};
