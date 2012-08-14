exports.command = function (cssSelector, callback) {
  var self = this;

  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._elementIdDisplayed(result.value.ELEMENT, function (result) {
        callback(result.value);
      });
    } else {
      callback(result);
    }
  });
};
