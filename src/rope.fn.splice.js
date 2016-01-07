rope.fn.splice = function (strung, start, length, newString) {
  var s = strung.value;
  var a = s.substr(0, start);
  var b = s.substr(start + length, s.length - start - length);
  strung.value = a + newString + b;
  return strung;
};
