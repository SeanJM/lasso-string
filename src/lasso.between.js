lasso.between = function (string, start, end) {
  var i, n, r, o, c, strLen;

  string = string.trim();
  strLen = string.length;
  i = string.indexOf(start);
  n = 0;
  o = [];
  c = [];

  if (i === -1) {
    return false;
  }

  while (i + n < strLen) {
    if (string[i + n] === start && string[i + n - 1] !== '\\') {
      o.push(string[i + n]);
    } else if (string[i + n] === end && string[i + n - 1] !== '\\') {
      c.push(string[i + n]);
    }

    if (o.length > 0 && o.length === c.length) {
      return {
				index : i + 1,
				length : n - 1,
				value : string.substr(i + 1, n - 1),
        capture : {
          index : i,
          length : n + 1,
          value : string.substr(i, n + 1)
        }
			};
    }

    n++;
  }

  return false;
};
