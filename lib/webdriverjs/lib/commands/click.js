exports.command = function (cssSelector, callback) {
  var self = this;
  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._elementIdClick(result.value.ELEMENT, function (result) {
        callback(result);
      });
    } else {
      callback(result);
    }
  });
};
