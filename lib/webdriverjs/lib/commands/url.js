exports.command = function (callback) {
  this._url(function (result) {
    if (result.status === 0) {
      callback(result.value);
    } else {
      callback(result);
    }
  });
  return this;
};
