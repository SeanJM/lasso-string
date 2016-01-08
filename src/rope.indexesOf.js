rope.fn.indexesOf = function (strung, match) {
  var string = strung.value;
  var index = 0;
  var max = string.length;
  strung.value = [];
  function isRegularExpression() {
    var currentIndex  = string.substr(index, max - index).search(match);
    var matchedString = string.match(match);
    if (matchedString) {
      matchedString = matchedString[0];
    } else {
      matchedString = '';
    }
    while (currentIndex !== -1 && index < max) {
      strung.value.push({
        index : index + currentIndex,
        length : matchedString.length,
        match : matchedString
      });
      index += currentIndex + matchedString.length;
      currentIndex  = string.substr(index, max - index).search(match);
      if (currentIndex !== -1) {
        matchedString = string.substr(index, max - index).match(match)[0];
      }
    }
  }
  function isString() {
    var currentIndex = string.substr(index, max - index).indexOf(match);
    while (currentIndex !== -1 && index < max) {
      strung.value.push({
        index : index + currentIndex,
        length : match.length,
        match : match
      });
      index        += currentIndex + match.length;
      currentIndex  = string.substr(index, max - index).indexOf(match);
    }
  }
  if (typeof match === 'string') {
    isString();
  } else if (typeof match.test === 'function') {
    isRegularExpression();
  }
  return strung;
};
