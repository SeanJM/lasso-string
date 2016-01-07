for (var k in rope.fn) {
  rope[k] = function (k) {
    return function (string) {
    	var strung = { value : string };
      var a = [].slice.call(arguments, 1);
      return rope.fn[k].apply(null, [strung].concat(a)).value;
    }
  }(k);
}
