lasso.camelCase = function (string, start, length, newString) {
  if (typeof string === 'string' && string.length) {
    string = string.replace(/-/g, ' ').trim().match(/[a-zA-Z0-9\. ]/g).join('').replace(/\./g, '_').split(' ').map(function (a, i) {
      if (i === 0) {
        return a.toLowerCase();
      }
      return a[0].toUpperCase() + a.substr(1, a.length).toLowerCase();
    }).join('');
  }
  return string;
};
