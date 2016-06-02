function map (array, iterator) {
  var i = 0;
  var n = array.length;
  var val = [];

  if (isArray(array)) {
    for (; i < n; i++) {
      val.push(iterator(array[i], i));
    }
  }

  return val;
}
