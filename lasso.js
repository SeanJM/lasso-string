var arrayTag = '[object Array]';

function Lasso (string) {
  this.value = string;
}

function lasso (string) {
  return new Lasso(string);
}

function isArray (array) {
  return Object.prototype.toString.call(array) === arrayTag;
}

function map (array, iterator) {
  var i = 0;
  var n = array.length;
  var val = [];

  if (isArray(array)) {
    for (; i < n; i++) {
      val.push(iterator(array[i], i));
    }
  }

  return val;
}

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

function camelCase (string) {
  return string.length ? string.replace(/[-\._]+|\s+/g, ' ').trim()

  .replace(/[A-Z][a-z0-9]+/g, function (a, i) {
  	return i > 0 ? ' ' + a : a;
  })

  .match(/[A-Za-z0-9 ]/g).join('').split(' ')

  .map(function (a, i) {
    return i === 0 ? a.toLowerCase() : capitalCase(a);
  })

  .join('') : string;
}

function capitalCase (string) {
  return map(string.trim().split(' '), function (a) {
    return /^[A-Z]/.test(a) ? a : a[0].toUpperCase() + a.substr(1).toLowerCase();
  }).join(' ');
}

function differentWords (a, b) {
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
}

/*
  Copyright (c) 2011 Andrei Mackenzie
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  https://gist.github.com/andrei-m/982927
*/

function distance (a, b) {
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
}

function ellipsis (string, length) {
  return !!string
    ? string.length > length
      ? trimEnd(string.substr(0, length)) + '...'
      : string
    : '';
}

function fuzzy (a, b) {
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
}

function group (string) {
  var s = string.toString().match(/[\d\.]/g).join('').split('.');
  var n = s[0].replace(/\s/g, '').split('').reverse();

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
}

function indexesOf (string, match) {
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

      index += currentIndex + match.length;
      currentIndex  = string.substr(index, max - index).indexOf(match);
    }
  }

  if (typeof match === 'string') {
    isString();
  } else if (typeof match.test === 'function') {
    isRegularExpression();
  }

  return indexes;
}

function matchType (string) {
  var type;
  var match = [''];
  var matchIndex = 0;
  function typeIndex(chr) {
    if (/[a-zA-Z ]/.test(chr)) {
      return 0;
    }
    if (/[0-9]/.test(chr)) {
      return 1;
    }
    if (/[\-\_]/.test(chr)) {
      return 2;
    }
    if (/[\.\,\;\:\?\!]/.test(chr)) {
      return 3;
    }
    if (/[\$\%\^\*\#\@\&\+\=]/.test(chr)) {
      return 4;
    }
    if (/[\[\]\{\}\(\)<>\"\']/.test(chr)) {
      return 5;
    }
    return 6;
  }
  type = typeIndex(string[0]);
  for (var i = 0, n = string.length; i < n; i++) {
    if (type !== typeIndex(string[i])) {
      match.push('');
      matchIndex += 1;
    }
    match[matchIndex] += string[i];
    type = typeIndex(string[i]);
  }
  return match;
}

function sameWords (a, b) {
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
}

function splice (string, start, length, newString) {
  return string.substr(0, start) + newString + string.substr(start + length, string.length - start - length);
}

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

function toChar (code) {
  if (Array.isArray(code)) {
    return code.map(function (a) {
      return String.fromCharCode(a);
    }).join('');
  }
  return String.fromCharCode(code);
}

function toCharCode (string) {
  return Array.prototype.map.call(string.split(''), function (a) {
    return a.charCodeAt(0);
  });
};

function toCurrency (prefix, value) {
  if (arguments.length === 1) {
    value = prefix;
    prefix = '$';
  }

  if (value < 0 || value.toString()[0] === '-') {
    return '-' + prefix + lasso.group((Number(value) * -1).toFixed(2));
  }

  return prefix + lasso.group(Number(value).toFixed(2));
}

function toPercentage (value) {
  if (!value || value === Infinity) {
    value = 0;
  }

  return value + '%';
}

function trimEnd (string) {
  return string.replace(/\s+$/, '');
};

function trimStart (string) {
  return string.replace(/^\s+/, '');
};

function trimStartUntil(str, match) {
  if (typeof match === 'string') {
    while (str[0] !== match && str.length) {
      str = str.substr(1);
    }
  } else {
    while (!match.test(str[0]) && str.length) {
      str = str.substr(1);
    }
  }
  return str;
}

Lasso.prototype.between = function (start, end) {
  this.value = between(this.value, start, end);
  return this;
};

Lasso.prototype.camelCase = function () {
  this.value = camelCase(this.value);
  return this;
};

Lasso.prototype.capitalCase = function () {
  this.value = capitalCase(this.value);
  return this;
};

Lasso.prototype.differentWords = function (word) {
  this.value = differentWords(this.value, word);
  return this;
};

Lasso.prototype.distance = function (word) {
  this.value = distance(this.value, word);
  return this;
};

Lasso.prototype.ellipsis = function (length) {
  this.value = ellipsis(this.value, length);
  return this;
};

Lasso.prototype.fuzzy = function (word) {
  this.value = fuzzy(this.value, word);
  return this;
};

Lasso.prototype.group = function () {
  this.value = group(this.value);
  return this;
};

Lasso.prototype.indexesOf = function (match) {
  this.value = indexesOf(this.value, match);
  return this;
};

Lasso.prototype.matchType = function () {
  this.value = matchType(this.value);
  return this;
};

Lasso.prototype.sameWords = function (word) {
  this.value = sameWords(this.value, word);
  return this;
};

Lasso.prototype.splice = function (start, length, newString) {
  this.value = sameWords(this.value, start, length, newString);
  return this;
};

Lasso.prototype.template = function () {
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  this.value = template.apply(null, [this.value].concat(a));
  return this;
};

Lasso.prototype.toChar = function () {
  this.value = toChar(this.value);
  return this;
};

Lasso.prototype.toCharCode = function () {
  this.value = toCharCode(this.value);
  return this;
};

Lasso.prototype.toCurrency = function (symbol) {
  this.value = toCurrency(symbol, this.value);
  return this;
};

Lasso.prototype.toPercentage = function () {
  this.value = toPercentage(this.value);
  return this;
};

Lasso.prototype.trimEnd = function () {
  this.value = trimEnd(this.value);
  return this;
};

Lasso.prototype.trimStart = function () {
  this.value = trimStart(this.value);
  return this;
};

Lasso.prototype.trimStartUntil = function (until) {
  this.value = trimStartUntil(this.value, until);
  return this;
};

Lasso.prototype.forEach = function (iterator) {
  this.value = map(this.value, iterator);
};

lasso.between = between;

lasso.camelCase = camelCase;

lasso.capitalCase = capitalCase;

lasso.differentWords = differentWords;

lasso.distance = distance;

lasso.ellipsis = ellipsis;

lasso.fuzzy = fuzzy;

lasso.group = group;

lasso.indexesOf = indexesOf;

lasso.matchType = matchType;

lasso.sameWords = sameWords;

lasso.splice = splice;

lasso.template = template;

lasso.toChar = toChar;

lasso.toCharCode = toCharCode;

lasso.toCurrency = toCurrency;

lasso.toPercentage = toPercentage;

lasso.trimEnd = trimEnd;

lasso.trimStart = trimStart;

lasso.trimStartUntil = trimStartUntil;

// Check the environment

if (typeof module === 'object') {
  module.exports = lasso;
} else if (typeof window === 'object') {
  window.lasso = lasso;
}
