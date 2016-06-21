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
