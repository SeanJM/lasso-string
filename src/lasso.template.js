lasso.template = function (string) {
  var s = [].slice.call(arguments, 1, arguments.length);
  var i = 0;
  return string.replace(/(?:%s|%([0-9]+))/g, function (a, b) {
    if (b) {
      return s[Number(b)];
    }
    i += 1;
    return s[i - 1];
  });
};
