lasso.toCurrency = function (prefix, value) {
  return prefix + lasso.group(value.toFixed(2));
};
