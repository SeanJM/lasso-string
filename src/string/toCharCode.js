function toCharCode (string) {
  return Array.prototype.map.call(string.split(''), function (a) {
    return a.charCodeAt(0);
  });
};
