function lasso (string) {
  var strung = { value : string };
  for (var k in lasso.fn) {
    strung[k] = function (k) {
      return function () {
        var a = [].slice.call(arguments);
        return lasso.fn[k].apply(null, [strung].concat(a));
      };
    }(k);
  }
  return strung;
};

lasso.fn = {};

if (typeof module === 'object') {
  module.exports = lasso;
}

lasso.fn.between = function (strung, a, b) {
  var captureIndex = [];
  var string = strung.value;
  var open = lasso.fn.indexesOf({ value : string }, a).value;
  var closed = lasso.fn.indexesOf({ value : string }, b).value;
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
  strung.value = captureIndex;
  return strung;
};

lasso.fn.indexesOf = function (strung, match) {
  var index   = 0;
  var indexes = [];
  var string  = strung.value;
  var max     = string.length;
  var currentIndex;
  if (arguments.length !== 2) {
    throw 'Error (lasso.fn.indexesOf): Missing Arguments';
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
  strung.value = indexes;
  return strung;
};

lasso.fn.jsCase = function (strung, start, length, newString) {
  if (typeof strung.value === 'string' && strung.value.length) {
    strung.value = strung.value.replace(/-/g, ' ').trim().match(/[a-zA-Z0-9\. ]/g).join('').replace(/\./g, '_').split(' ').map(function (a, i) {
      if (i === 0) {
        return a.toLowerCase();
      }
      return a[0].toUpperCase() + a.substr(1, a.length).toLowerCase();
    }).join('');
  }
  return strung;
};

lasso.fn.splice = function (strung, start, length, newString) {
  var s = strung.value;
  strung.value = s.substr(0, start) + newString + s.substr(start + length, s.length - start - length);
  return strung;
};

lasso.fn.template = function (strung) {
  var s = [].slice.call(arguments, 1, arguments.length);
  var i = 0;
  strung.value = strung.value.replace(/(?:%s|%([0-9]+))/g, function (a, b) {
    if (b) {
      return s[Number(b)];
    }
    i += 1;
    return s[i - 1];
  });
  return strung;
};

lasso.fn.toCharCode = function (strung) {
  strung.value = Array.prototype.map.call(strung.value.split(''), function (a) {
    return a.charCodeAt(0);
  });
  return strung;
};

for (var k in lasso.fn) {
  lasso[k] = function (k) {
    return function (string) {
    	var strung = { value : string };
      var a = [].slice.call(arguments, 1);
      return lasso.fn[k].apply(null, [strung].concat(a)).value;
    }
  }(k);
}
