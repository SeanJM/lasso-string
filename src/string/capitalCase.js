function capitalCase (string) {
  return map(string.trim().split(' '), function (a) {
    return /^[A-Z]/.test(a) ? a : a[0].toUpperCase() + a.substr(1).toLowerCase();
  }).join(' ');
}
