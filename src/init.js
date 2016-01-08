for (var k in lasso.fn) {
  rope[k] = function (k) {
    return function (string) {
    	var strung = { value : string };
      var a = [].slice.call(arguments, 1);
      return lasso.fn[k].apply(null, [strung].concat(a)).value;
    }
  }(k);
}
