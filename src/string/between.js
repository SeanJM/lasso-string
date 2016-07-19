function between (string, start, end) {
  var i = string.indexOf(start);
  var n = 1;
  var o = 1;

  while (i > -1 && i + n < string.length && o > 0) {
    if (string[i + n - 1] !== '\\') {
      if (string[i + n] === start) {
        o++;
      } else if (string[i + n] === end) {
        o--;
      }
    }
    n++;
  }

  return o === 0
    ? [ string.substr(i, n + 1), string.substr(i + 1, n - 2) ]
    : false;
}
