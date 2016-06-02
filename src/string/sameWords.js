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
