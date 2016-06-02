function isArray (array) {
  return Object.prototype.toString.call(array) === arrayTag;
}
