function ellipsis (string, length) {
  return !!string
    ? string.length > length
      ? trimEnd(string.substr(0, length)) + '...'
      : string
    : '';
}
