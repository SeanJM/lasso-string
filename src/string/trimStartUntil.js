function trimStartUntil(str, match) {
  while (str[0] !== match && str.length) {
    str = str.substr(1);
  }
  return str;
}
