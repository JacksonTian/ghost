exports.command = function (name, callback) {
  this._window(name, callback);
  return this;
};
