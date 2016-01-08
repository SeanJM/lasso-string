function lasso (string) {
  var strung = { value : string };
  for (var k in lasso.fn) {
    strung[k] = function (k) {
      return function () {
        var a = [].slice.call(arguments);
        return lasso.fn[k].apply(null, [strung].concat(a));
      };
    }(k);
  }
  return strung;
};

lasso.fn = {};

if (typeof module === 'object') {
  module.exports = lasso;
}
