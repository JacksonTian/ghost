exports.command = function(cssSelector, cssProperty, callback) {
  var self = this;
  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._css(result.value.ELEMENT, cssProperty, function (result) {
        callback(result.value);
      });
    } else {
      callback(result);
    }
  });
};
