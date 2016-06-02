function template (string) {
  var i = 0;
  var n = arguments.length - 1;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i + 1];
  }

  i = 0;

  return string.replace(/(?:%s|%([0-9]+))/g, function (x, b) {
    i += 1;
    return b ? a[Number(b)] : a[i - 1];
  });
}
