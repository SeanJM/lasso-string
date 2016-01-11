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
