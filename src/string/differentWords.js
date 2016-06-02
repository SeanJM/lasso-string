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
