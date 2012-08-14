exports.command = function (cssSelector, attributeName, callback) {
  var self = this;

  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._attr(result.value.ELEMENT, attributeName, function(result) {
        callback(result.value);
      });
    } else {
      callback(false);
    }
  });
};
