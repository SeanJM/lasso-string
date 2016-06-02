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
