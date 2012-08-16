exports.command = function (cssSelector, callback) {
  this._element("css selector", cssSelector, function (result) {
    callback(result.status === 0);
  });
};
