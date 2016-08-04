function between (string, start, end) {
  var startLen = start.length;
  var endLen = end.length;
  var i = string.indexOf(start);
  var n = 1;
  var o = 1;
  var esc;
  var arr;

  while (i > -1 && i + n < string.length && o > 0) {
  	esc = string[i + n - 1] !== '\\';
    if (esc && string.substr(i + n, startLen) === start) {
      o++;
    } else if (esc && string.substr(i + n, endLen) === end) {
      o--;
    }
    n++;
  }

  arr = [ string.substr(i, n + 1), string.substr(i + 1, n - 2) ];

  arr.start = i;
  arr.end = n + 1;

  return o === 0
    ? arr
    : false;
}
