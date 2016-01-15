lasso.group = function (string, start, length, newString) {
  var s = string.toString().split('.');
  var n = s[0].split('').reverse();
  for (var i = n.length; i >= 0; i--) {
    if (i > 0 && i % 3 === 0) {
      n.splice(i, 0, ',');
    }
  }
  if (s.length === 2) {
    return n.reverse().join('') + '.' + s.slice(1).join('.');
  }
  return n.reverse().join('');
};
