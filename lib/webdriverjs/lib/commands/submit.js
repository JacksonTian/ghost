exports.command = function (cssSelector, callback) {
  var self = this;
  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._submit(result.value.ELEMENT, callback);
    } else {
      callback(result);
    }
  });
};
