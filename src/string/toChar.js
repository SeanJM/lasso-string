function toChar (code) {
  if (Array.isArray(code)) {
    return code.map(function (a) {
      return String.fromCharCode(a);
    }).join('');
  }
  return String.fromCharCode(code);
}
