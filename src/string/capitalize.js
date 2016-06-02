function capitalize (string) {
  return map(string.trim().split(' '), function (a, i) {
    // If it's the first word, capitalize it
    if (i === 0) {
      return a[0].toUpperCase() + a.substr(1).toLowerCase();
    } else if (/^A-Z/.test(a)) {
      // If the word starts capitalized, don't change it.
      return a;
    }

    return a.toLowerCase();
  }).join(' ');
}
