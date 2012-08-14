exports.command = function (callback) {
  this._session("delete", function(result) {
    callback();
  });
};
