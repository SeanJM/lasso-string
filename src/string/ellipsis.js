function ellipsis (string, length) {
  return string.length > length ? trimEnd(string.substr(0, length)) + '...' : string;
}
