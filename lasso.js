function lasso (string) {
  return lasso.chain(string);
}

if (typeof module === 'object') {
  module.exports = lasso;
}

lasso.between = function (string, a, b) {
  var captureIndex = [];
  var open = lasso.indexesOf(string, a);
  var closed = lasso.indexesOf(string, b);
  var smartCapture = {
    closed : { ')' : '(', '}' : '{', ']' : '[' },
    open : { '(' : ')', '{' : '}', '[' : ']' }
  };
  function getLength(u) {
    return u ? u.length : 0;
  }
  function capture(oIndex, cIndex, l) {
    var x = open[oIndex];
    var y = closed[cIndex];
    captureIndex.push({
      length : l - x.length - y.length,
      index : x.index + x.length,
      capture : {
        index : x.index,
        length : l,
        value : string.substr(x.index, l)
      },
      value : string.substr(x.index + x.length, l - y.length - x.length)
    });
    open.splice(oIndex, 1);
    closed.splice(cIndex, 1);
  }
  function smartOpen(x, aR, bR) {
    var n = open.length - 1;
    var l = closed[x].index - open[n].index + closed[x].length;
    var s = string.substr(open[n].index, l);
    var t = getLength(s.match(aR));
    var u = getLength(s.match(bR));
    if (open[n].index < closed[x].index && t === u) {
      capture(n, x, l);
      if (open.length) {
        smartOpen(0, aR, bR);
      }
    } else if (open.length && closed.length) {
      smartOpen(x + 1, aR, bR);
    }
  }
  function smartClosed(x, aR, bR) {
    var n = closed.length - 1;
    var l = closed[n].index + closed[n].length - open[x].index;
    var s = string.substr(open[x].index, l);
    var t = getLength(s.match(aR));
    var u = getLength(s.match(bR));
    if (open[x].index < closed[n].index && t === u) {
      capture(x, n, l);
      if (closed.length) {
        smartClosed(open.length - 1, aR, bR);
      }
    } else if (open.length && closed.length) {
      smartClosed(x - 1, aR, bR);
    }
  }
  function findMatch(x) {
    var n = open.length - 1;
    var l = closed[x].index - open[n].index + closed[x].length;
    if (open[n].index < closed[x].index) {
      capture(n, x, l);
      if (open.length) {
        findMatch(0);
      }
    } else if (open.length && closed.length) {
      findMatch(x + 1);
    }
  }
  if (open.length && closed.length) {
    if (smartCapture.open[a] !== b && typeof smartCapture.closed[b] === 'string') {
      smartOpen(0, new RegExp('\\' + smartCapture.closed[b], 'g'), new RegExp('\\' + b, 'g'));
    } else if (smartCapture.open[a] !== b && typeof smartCapture.open[a] === 'string') {
      smartClosed(open.length - 1, new RegExp('\\' + a, 'g'), new RegExp('\\' + smartCapture.open[a], 'g'));
    } else {
      findMatch(0);
    }
  }
  return captureIndex;
};

lasso.camelCase = function (string, start, length, newString) {
  if (typeof string === 'string' && string.length) {
    string = string.replace(/[\-]+/g, ' ').trim().match(/[a-zA-Z0-9\. ]/g).join('').replace(/\./g, '_').split(' ').map(function (a, i) {
      if (i === 0) {
        return a.toLowerCase();
      }
      return a[0].toUpperCase() + a.substr(1, a.length).toLowerCase();
    }).join('');
  }
  return string;
};

lasso.differentWords = function (a, b) {
	var z = [];
	var index;
	var x;
	var y;
	var i;
	var n;
	var j;
	var m;
	a = a.match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ').split(' ');
	b = b.match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ').split(' ');
	for (i = 0, n = a.length; i < n; i++) {
		index = b.indexOf(a[i]);
		if (index === -1) {
			z.push(a[i]);
		}
		while (index > -1) {
			b.splice(index, 1);
			index = b.indexOf(a[i]);
		}
	}
	for (i = 0, n = b.length; i < n; i++) {
		index = a.indexOf(b[i]);
		if (index === -1 && z.indexOf(b[i]) === -1) {
			z.push(b[i]);
		}
		while (index > -1) {
			a.splice(index, 1);
			index = a.indexOf(b[i]);
		}
	}
	return z;
};

/*
  Copyright (c) 2011 Andrei Mackenzie
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  https://gist.github.com/andrei-m/982927
*/

lasso.distance = function(a, b) {
  var matrix = [];
  var i;
  var j;
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }
  // increment along the first column of each row
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  // increment each column in the first row
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1); // deletion
      }
    }
  }
  return matrix[b.length][a.length];
};

lasso.fuzzy = function(a, b) {
  var index = a.indexOf(b[0]);
	var opt = [];
  var n = 0;
  var o;
  opt.distance = 0;
  opt.closest = a.length;
  opt.farthest = 0;
  while (index > -1) {
    o = {
      index : index + n,
      length : 1,
      match : b[opt.length]
    };
    opt.push(o);
    opt.distance = o.index - opt[0].index;
    n = index;
    index = a.substr(n, a.length - n).indexOf(b[opt.length]);
    if (index > -1 && index + n - o.index < opt.closest) {
      opt.closest = index + n - o.index;
    }
    if (n - index > opt.farthest) {
      opt.farthest = n - index;
    }
  }
  if (opt.length === b.length) {
    opt.difference = opt.farthest - opt.closest;
    return opt;
  }
  return false;
};

lasso.group = function (string, start, length, newString) {
  var s = string.toString().split('.');
  var n = s[0].split('').reverse();
  if (n.length > 3) {
    for (var i = n.length; i >= 0; i--) {
      if (i < n.length && i > 0 && i % 3 === 0) {
        n.splice(i, 0, ',');
      }
    }
  }
  if (s.length === 2) {
    return n.reverse().join('') + '.' + s.slice(1).join('.');
  }
  return n.reverse().join('');
};

lasso.indexesOf = function (string, match) {
  var index   = 0;
  var indexes = [];
  var max     = string.length;
  var currentIndex;
  if (arguments.length !== 2) {
    throw 'Error (lasso.indexesOf): Missing Arguments';
  }
  function isRegularExpression() {
    var matched = match.exec(string.substr(0, max));
    while (matched) {
      currentIndex = matched.index;
      indexes.push({
        index : index + currentIndex,
        length : matched[0].length,
        match : matched[0]
      });
      index += currentIndex + matched[0].length;
      matched = match.exec(string.substr(index, max - index));
    }
  }
  function isString() {
    currentIndex = string.substr(index, max - index).indexOf(match);
    while (currentIndex !== -1 && index < max) {
      indexes.push({
        index : index + currentIndex,
        length : match.length,
        match : match
      });
      index        += currentIndex + match.length;
      currentIndex  = string.substr(index, max - index).indexOf(match);
    }
  }
  if (typeof match === 'string') {
    isString();
  } else if (typeof match.test === 'function') {
    isRegularExpression();
  }
  return indexes;
};

lasso.sameWords = function (a, b) {
  var same = [];
	var index;
	var x;
	var y;
	var i;
	var n;
	var j;
	var m;
	a = a.match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ').split(' ');
	b = b.match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ').split(' ');
	x = a;
	y = b;
	if (a.length < b.length) {
		x = b;
		y = a;
	}
	for (i = 0, n = x.length; i < n; i++) {
		index = y.indexOf(x[i]);
		if (index > -1) {
			same.push(x[i]);
		}
		while (index > -1) {
			y.splice(index, 1);
			index = y.indexOf(x[i]);
		}
	}
	return same;
};

lasso.splice = function (string, start, length, newString) {
  return string.substr(0, start) + newString + string.substr(start + length, string.length - start - length);
};

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

lasso.toChar = function (code) {
  if (Array.isArray(code)) {
    return code.map(function (a) {
      return String.fromCharCode(a);
    }).join('');
  }
  return String.fromCharCode(code);
};

lasso.toCharCode = function (string) {
  return Array.prototype.map.call(string.split(''), function (a) {
    return a.charCodeAt(0);
  });
};

lasso.toCurrency = function (prefix, value) {
  if (arguments.length === 1) {
    value = prefix;
    prefix = '$';
  }
  if (value < 0 || value.toString()[0] === '-') {
    return '-' + prefix + lasso.group((Number(value) * -1).toFixed(2));
  }
  return prefix + lasso.group(Number(value).toFixed(2));
};

(function () {
  var strung = {};
  for (var k in lasso) {
    strung[k] = function (k) {
      return function () {
        var a = [].slice.call(arguments);
        strung.value = lasso[k].apply(null, [strung.value].concat(a));
        return strung;
      };
    }(k);
  }
  lasso.chain = function (string) {
    strung.value = string;
    return strung;
  };
}());
