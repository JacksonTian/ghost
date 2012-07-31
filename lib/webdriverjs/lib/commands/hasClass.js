exports.command = function (cssSelector, callback) {
  var self = this;

  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._attr(result.value.ELEMENT, 'class', function (result) {
        if (typeof callback === "function") {
          callback(result.value);
        }
      });
    } else {
      if (typeof callback === "function") {
        callback(result.value);
      }
    }
  });
};
