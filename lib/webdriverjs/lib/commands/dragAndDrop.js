exports.command = function (cssSelectorItem, cssSelectorDropDestination, callback) {
  var self = this;

  self._moveToObject(cssSelectorItem);
  self._buttonDown();
  self._moveToObject(cssSelectorDropDestination);
  self._buttonUp(function () {
    if (typeof callback === "function") {
      callback();
    }
  });
};
