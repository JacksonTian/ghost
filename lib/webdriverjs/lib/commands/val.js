/**
 * client.val(selector, value, callback); // $(selector).val(value); set value
 * client.val(selector, callback); // $(selector).val(); get value
 */
exports.command = function (cssSelector, value, callback) {
  var type = arguments.length === 3 ? "set" : "get";
  if (type === "get") {
    callback = value;
  }

  var self = this;
  self._element("css selector", cssSelector, function (result) {
    if (result.status === 0) {
      if (type === "set") {
        self._elementIdValue(result.value.ELEMENT, value, function (data) {
          callback(data);
        });
      } else {
        self._elementIdValue(result.value.ELEMENT, function (data) {
          callback(data.value);
        });
      }
    } else {
      callback(result.value);
    }
  });
  return this;
};
