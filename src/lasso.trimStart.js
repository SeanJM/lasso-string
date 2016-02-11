lasso.trimStart = function (string) {
  var i = 0;
  var s = string.substr(i, 1);
  while (s === ' ' || s === '\n' || s === '\t' || s === '\r') {
    i += 1;
    s = string.substr(i, 1);
  }
  return string.slice(i);
};
