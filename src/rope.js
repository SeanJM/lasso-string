function rope (string) {
  var strung = { value : string };
  for (var k in rope.fn) {
    strung[k] = function (k) {
      return function () {
        var a = [].slice.call(arguments);
        return rope.fn[k].apply(null, [strung].concat(a));
      };
    }(k);
  }
  return strung;
};

rope.fn = {};
