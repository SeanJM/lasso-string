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
