exports.command = function (callback)  {
  this._title(function (result) {
    if (result.status === 0) {
      callback(result.value);
    } else {
      callback(result);
    }
  });
};
