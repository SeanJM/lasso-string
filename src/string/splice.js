function splice (string, start, length, newString) {
  return string.substr(0, start) + newString + string.substr(start + length, string.length - start - length);
}
