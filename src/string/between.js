function between(a, b, string, index) {
  var o = 0;
  var i = index || 0;
  var n = string.length;
  var start;
  var alen = a.length;
  var blen = b.length;

  while (string[i] !== a && string[i]) {
    i++;
  }

  start = i;

  for (; i < n; i++) {
    if (string.substring(i, i + alen) === a) {
      o += 1;
    } else if (string.substring(i, i + blen) === b) {
      o -= 1;
    }

    if (o === 0) {
      return {
        start : start,
        end : i,
        length : i - start,
        value : string.substring(start + 1, i)
      };
    }
  }

  return false;
}
