lasso.toCurrency = function (prefix, value) {
  if (arguments.length === 1) {
    value = prefix;
    prefix = '$';
  }
  if (value < 0 || value.toString()[0] === '-') {
    return '-' + prefix + lasso.group((Number(value) * -1).toFixed(2));
  }
  return prefix + lasso.group(Number(value).toFixed(2));
};
