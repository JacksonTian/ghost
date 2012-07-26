exports.command = function (callback) {
  this._session("delete", function(result) {
    if (typeof callback === "function") {
      callback();
    }
  });
};
