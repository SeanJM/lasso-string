lasso.fn.toCharCode = function (strung) {
  strung.value = Array.prototype.map.call(strung.value.split(''), function (a) {
    return a.charCodeAt(0);
  });
  return strung;
};
