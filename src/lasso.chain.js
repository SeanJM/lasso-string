(function () {
  var strung = {};
  for (var k in lasso) {
    strung[k] = function (k) {
      return function () {
        var a = [].slice.call(arguments);
        strung.value = lasso[k].apply(null, [strung.value].concat(a));
        return strung;
      };
    }(k);
  }
  lasso.chain = function (string) {
    strung.value = string;
    return strung;
  };
}());
