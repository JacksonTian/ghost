exports.command = function (url, callback) {
  this._go(url, callback);
  return this;
};
