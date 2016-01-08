rope.fn.splice = function (strung, start, length, newString) {
  strung.value = strung.value.substr(0, start) + newString + strung.value.substr(start + length, strung.value.length - start - length);
  return strung;
};
