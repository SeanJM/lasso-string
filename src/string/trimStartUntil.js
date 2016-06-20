function trimStartUntil(str, match) {
  if (typeof match === 'string') {
    while (str[0] !== match && str.length) {
      str = str.substr(1);
    }
  } else {
    while (!match.test(str[0]) && str.length) {
      str = str.substr(1);
    }
  }
  return str;
}
