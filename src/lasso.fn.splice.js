lasso.fn.splice = function (strung, start, length, newString) {
  var s = strung.value;
  strung.value = s.substr(0, start) + newString + s.substr(start + length, s.length - start - length);
  return strung;
};
