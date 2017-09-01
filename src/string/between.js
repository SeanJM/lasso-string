function between(a, b, string, index) {
  var o = 0;
  var i = index || 0;
  var n = string.length;
  var start;

  var alen;
  var blen;
  var t;

  if (a instanceof RegExp) {
    t = string.match(a);

    if (!t) {
      return false;
    }

    a = t[0];
  }

  if (b instanceof RegExp) {
    t = string.match(b);

    if (!t) {
      return false;
    }

    b = t[0];
  }

  alen = a.length;
  blen = b.length;

  while (string[i] && string.substring(i, i + alen) !== a) {
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
        start : start + alen,
        end : i,
        length : i - start,
        value : string.substring(start + alen, i)
      };
    }
  }

  return false;
}