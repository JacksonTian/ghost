exports.command = function (callback) {
  this._status(function (result) {
    if (result.status === 0) {
      callback(result.value);
    } else {
      callback(result);
    }
  });
};
