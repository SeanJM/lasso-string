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

lasso.group = function (string, start, length, newString) {
  var s = string.toString().split('.');
  var n = s[0].split('').reverse();
  if (n.length > 3) {
    for (var i = n.length; i >= 0; i--) {
      if (i > 0 && i % 3 === 0) {
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
