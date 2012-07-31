exports.command = function (cssSelector, className, callback) {
  var self = this;

  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      self._attr(result.value.ELEMENT, 'class', function (result) {
        if (typeof callback === "function") {
          callback(result.value.split(/\s+/g).indexOf(className) !== -1);
        }
      });
    } else {
      if (typeof callback === "function") {
        callback(result.value);
      }
    }
  });
};
