rope.fn.toCharCode = function (strung) {
  strung.value = strung.value.split('').map(function (a) {
    return a.charCodeAt(0);
  });
  return strung;
};
