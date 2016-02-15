lasso.matchType = function (string) {
  var type;
  var match = [''];
  var matchIndex = 0;
  function typeIndex(chr) {
    if (/[a-zA-Z ]/.test(chr)) {
      return 0;
    }
    if (/[0-9]/.test(chr)) {
      return 1;
    }
    if (/[\-\_]/.test(chr)) {
      return 2;
    }
    if (/[\.\,\;\:\?\!]/.test(chr)) {
      return 3;
    }
    if (/[\$\%\^\*\#\@\&\+\=]/.test(chr)) {
      return 4;
    }
    if (/[\[\]\{\}\(\)\<\>\"\']/.test(chr)) {
      return 5;
    }
    return 6;
  }
  type = typeIndex(string[0]);
  for (var i = 0, n = string.length; i < n; i++) {
    if (type !== typeIndex(string[i])) {
      match.push('');
      matchIndex += 1;
    }
    match[matchIndex] += string[i];
    type = typeIndex(string[i]);
  }
  for (var i = 0, n = match.length; i < n; i++) {
    if (!isNaN(Number(match[i]))) {
      match[i] = Number(match[i]);
    }
  }
  return match;
};
