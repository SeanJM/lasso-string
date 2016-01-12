function lasso (string) {
  var strung = { value : string };
  for (var k in lasso) {
    strung[k] = function (k) {
      return function () {
        var a = [].slice.call(arguments);
        strung.value = lasso[k].apply(null, [strung.value].concat(a));
        return strung;
      };
    }(k);
  }
  return strung;
};

if (typeof module === 'object') {
  module.exports = lasso;
}
