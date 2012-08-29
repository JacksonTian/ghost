exports.command = function (callback) {
  this._windowHandles(function (result) {
    callback(result.value);
  });
  return this;
};
