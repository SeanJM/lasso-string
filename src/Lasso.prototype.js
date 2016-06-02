Lasso.prototype.between = function (start, end) {
  this.value = between(this.value, start, end);
  return this;
};

Lasso.prototype.camelCase = function () {
  this.value = camelCase(this.value);
  return this;
};

Lasso.prototype.capitalize = function () {
  this.value = capitalize(this.value);
  return this;
};

Lasso.prototype.differentWords = function (word) {
  this.value = differentWords(this.value, word);
  return this;
};

Lasso.prototype.distance = function (word) {
  this.value = distance(this.value, word);
  return this;
};

Lasso.prototype.fuzzy = function (word) {
  this.value = fuzzy(this.value, word);
  return this;
};

Lasso.prototype.group = function () {
  this.value = group(this.value);
  return this;
};

Lasso.prototype.indexesOf = function (match) {
  this.value = indexesOf(this.value, match);
  return this;
};

Lasso.prototype.matchType = function () {
  this.value = matchType(this.value);
  return this;
};

Lasso.prototype.sameWords = function (word) {
  this.value = sameWords(this.value, word);
  return this;
};

Lasso.prototype.splice = function (start, length, newString) {
  this.value = sameWords(this.value, start, length, newString);
  return this;
};

Lasso.prototype.template = function () {
  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  this.value = template.apply(null, [this.value].concat(a));
  return this;
};

Lasso.prototype.toChar = function () {
  this.value = toChar(this.value);
  return this;
};

Lasso.prototype.toCharCode = function () {
  this.value = toCharCode(this.value);
  return this;
};

Lasso.prototype.ellipsis = function (length) {
  this.value = ellipsis(this.value, length);
  return this;
};

Lasso.prototype.forEach = function (iterator) {
  this.value = map(this.value, iterator);
};
