exports.command = function (callback) {
  this._source(function (result) {
    if (result.status === 0) {
      callback(result.value);
    } else {
      callback(result);
    }
  });
};
