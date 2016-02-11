lasso.trimEnd = function (string) {
  var n = string.length - 1;
  var s = string.substr(n, 1);
  while (s === ' ' || s === '\n' || s === '\t' || s === '\r') {
    n -= 1;
    s = string.substr(n, 1);
  }
  return string.substr(0, n + 1);
};
