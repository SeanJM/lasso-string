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
